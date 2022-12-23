import {beforeEach} from "@jest/globals";
import {MockResponse} from "../../mocks/Response.mock";
import handler from "../../../src/pages/api/login";

var fetch = jest.fn();
jest.mock('node-fetch', () => ({
    _esModule: true,
    default: fetch
}))
describe('api/login', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should make a fetch, set cookie, return result', async () => {
        const username = 'matttm';
        const password = 'password';
        fetch.mockReturnValue(Promise.resolve());
        const req = { body: { username, password } };
        const res = await handler(req, Object.create(MockResponse));
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
        expect(res).toBeTruthy();
    });
});
