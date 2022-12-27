
jest.mock('node-fetch', () => ({
    __esModule: true,
    default: jest.fn()
}));
import {beforeEach} from "@jest/globals";
import {MockResponse} from "../../mocks/Response.mock";
import handler from "../../../src/pages/api/login";
import fetch from "node-fetch";

describe('api/login', () => {
    const username = 'matttm';
    const password = 'password';
    const req = { body: { username, password } };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should make a fetch, set cookie, return result', async () => {
        (fetch as any).mockReturnValue(Promise.resolve({
            json: () => Promise.resolve({ data: { login: { token: 'token' }} })
        }));
        const _res = MockResponse();
        const res = await handler(req, _res);
        expect(fetch).toHaveBeenCalledWith('http://localhost:8080/query', {
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
        expect(_res.setHeader).toHaveBeenCalled();
        expect(res).toBeTruthy();
        expect(res._status).toBe(200);
    });
    it('should make a fetch, set cookie, return result', async () => {
        (fetch as any).mockReturnValue(Promise.reject());
        const _res = MockResponse();
        const res = await handler(req, _res).catch((r) => {
            expect(r._status).toBe(500);
        });
    });
});
