import "@testing-library/jest-dom";
import {fireEvent, render, waitFor} from "@testing-library/react";
import {RouterMock} from "../../mocks/Router.mock";
import {afterEach, beforeEach} from "@jest/globals";
import React from "react";
import {GlobalContext} from "../../../src/context/GlobalContext";
import {MockGlobalContext} from "../../mocks/GlobalContext.mock";
import AuthNav from "../../../src/components/navigation/AuthNav";
import {getByText} from "@testing-library/dom";

const routerMock = { ...RouterMock };
jest.mock('next/router', () => ({
    useRouter() {
        return routerMock;
    },
}));
describe("AuthNav", () => {
    describe('when logged in', () => {
        beforeEach(() => {
            jest.restoreAllMocks();
        });
        it('should display logout only, and set auth and route on click', async () => {
            const contextMock = { ...MockGlobalContext, isAuthenticated: true };
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
            const container = dom.container;
            expect(() => getByText(container, 'Logout')).not.toThrow();
            expect(() => getByText(container, 'Login')).toThrow();
            expect(() => getByText(container, 'Register')).toThrow();
            fireEvent.click(getByText(container, 'Logout'));
            await waitFor(() => {
                expect(global.fetch).toHaveBeenCalledWith('/api/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    }
                });
                expect(contextMock.setPerson).toHaveBeenCalled();
                expect(contextMock.setIsAuthenticated).toHaveBeenCalled();
                expect(routerMock.push).toHaveBeenCalledWith('/');
            });
        });
    });
    describe('when logged out', () => {
        beforeEach(() => {
            jest.restoreAllMocks();
        });
        it('should display logout only, and set auth and route on click', () => {
            const contextMock = { ...MockGlobalContext, isAuthenticated: false };
            const dom = render(
                <GlobalContext.Provider value={contextMock}>
                    <AuthNav />
                </GlobalContext.Provider>
            );
            const container = dom.container;
            expect(() => getByText(container, 'Logout')).toThrow();
            expect(() => getByText(container, 'Login')).not.toThrow();
            expect(() => getByText(container, 'Register')).not.toThrow();
        });
    });
});
