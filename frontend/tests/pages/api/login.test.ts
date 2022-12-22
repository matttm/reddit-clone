import {beforeEach} from "@jest/globals";

const fetch = jest.fn();
global.fetch = fetch;
describe('api/login', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('should make a fetch, set cookie, return result', () => {
        fetch.mockReturnValue(Promise.resolve());

    });
});
