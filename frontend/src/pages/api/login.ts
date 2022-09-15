import {LoginDocument} from "../../generated/graphql";
import fetch from 'node-fetch';

export default async function handler(req: any, res: any) {
    const{ username, password } = req.body;
    console.log(username, password)
    const payload = await fetch('http://localhost:8080/query',  {
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
    const data: any = await payload.json();
    const token = data?.login?.token;

    console.log(data)
    return res.status(200).json(payload);
}
