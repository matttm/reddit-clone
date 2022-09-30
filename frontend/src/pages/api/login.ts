import {LoginDocument, MutationLoginArgs} from "../../generated/graphql";
import fetch from 'node-fetch';
import cookie from "cookie";

export default async function handler(req: any, res: any) {
    const{ username, password } = req.body;
    try {
        const payload = await fetch('http://localhost:8080/query', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
                query: `
    mutation login($username: String!, $password: String!) {
  login(credentials: {username: $username, password: $password}) {
    person {
      id
      username
      createdAt
    }
    token
  }
}
    `,
                variables: {
                    username,
                    password
                }
            })
        });
        const {data}: any = await payload.json();
        const token = data?.login?.token;
        res.setHeader('Set-Cookie', cookie.serialize('TOKEN_KEY', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 60 * 60,
            sameSite: "strict",
            path: '/'
        }));
        return res.status(200).json(data);
    } catch (e) {
        console.log('Error during login fetch in api', e);
        return res.status(500).json();
    }
}
