import cookie from "cookie";

/**
 * Handler for logout
 *
 * @param req
 * @param res
 */
export default async function handler(req: any, res: any) {
    try {
        res.setHeader('Set-Cookie', cookie.serialize('TOKEN_KEY', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            maxAge: 0,
            sameSite: "strict",
            path: '/'
        }));
        return res.status(200).json({});
    } catch (e) {
        console.log('Error during logout in api', e);
        return res.status(500).json();
    }
}
