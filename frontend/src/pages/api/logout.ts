import cookie from "cookie";

export default async function handler(req: any, res: any) {
    try {
        res.setHeader('Set-Cookie', cookie.serialize('TOKEN_KEY', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 0,
            sameSite: "strict",
            path: '/'
        }));
        // console.log('Removing cookie');
        return res.status(200).json({});
    } catch (e) {
        console.log('Error during logout in api', e);
        return res.status(500).json();
    }
}