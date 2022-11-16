import "@testing-library/jest-dom";
import {fireEvent, render} from "@testing-library/react";
import {RouterMock} from "../../mocks/Router.mock";
import {afterEach, beforeEach} from "@jest/globals";
import React from "react";
import {GlobalContext} from "../../../src/context/GlobalContext";
import {MockGlobalContext} from "../../mocks/GlobalContext.mock";
import AuthNav from "../../../src/components/navigation/AuthNav";
import {getByText} from "@testing-library/dom";
import {useRouter} from "next/router";

const routerMock = { ...RouterMock };
jest.mock('next/router', () => ({
    useRouter() {
        return routerMock;
    },
}));
describe("AuthNav", () => {
    describe('when logged in', () => {

        beforeEach(() => {
            // jest.useFakeTimers();
        });
        afterEach(() => {
            jest.resetAllMocks();
            jest.restoreAllMocks();
        });
        it('should display logout only and route on click', (done) => {
            const pushSpy = jest.spyOn(routerMock, 'push').mockImplementation((e) => console.log(e, 'etf'))
            const contextMock = {
                setLoading: jest.fn(),
                setIsAuthenticated: jest.fn(),
                setPerson: jest.fn(),
                person: null,
                loading: true,
                isAuthenticated: true };
            // jest.mock('../../../src/context/GlobalContext', () => contextMock);
            // @ts-ignore
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () => Promise.resolve({}),
                })
            );
            const dom = render(
                <GlobalContext.Provider value={contextMock}>
                    <AuthNav />
                </GlobalContext.Provider>
            );
            // const router = useRouter();
            const container = dom.container;
            expect(() => getByText(container, 'Logout')).not.toThrow();
            expect(() => getByText(container, 'Login')).toThrow();
            expect(() => getByText(container, 'Register')).toThrow();
            fireEvent.click(getByText(container, 'Logout'));
            expect(global.fetch).toHaveBeenCalledWith('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
            // jest.runAllTimers();
            expect(routerMock.push).toHaveBeenCalledWith('/');
            expect(contextMock.setPerson).toHaveBeenCalled();
            expect(contextMock.setIsAuthenticated).toHaveBeenCalled();
            done();
        });
    });
});
