import {LoginDocument} from "../../generated/graphql";
import fetch from 'node-fetch';

export default async function handler(req: any, res: any) {
    const{ username, password } = req.body;
    console.log(username, password)
    const payload = await fetch('/graphql',  {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            LoginDocument,
            variables: {
                credentials: {
                    username,
                    password
                }
            }
        })
    });
    console.log(password)
    return res.status(200).json(payload);
}
