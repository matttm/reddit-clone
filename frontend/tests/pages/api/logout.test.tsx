
import {beforeEach} from "@jest/globals";
import {MockResponse} from "../../mocks/Response.mock";
import handler from "../../../src/pages/api/logout";

describe('api/logout', () => {
    const username = 'matttm';
    const password = 'password';
    const req = { body: { username, password } };
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should clear token', async () => {
        const _res = MockResponse();
        const res = await handler(req, _res);
        expect(_res.setHeader).toHaveBeenCalled();
        expect(res).toBeTruthy();
        expect(res._status).toBe(200);
    });
    it('should make a fetch, set cookie, return result', async () => {
        const _res = MockResponse();
        const res = await handler(req, _res).catch((r) => {
            expect(r._status).toBe(500);
        });
    });
});
