import "@testing-library/jest-dom";
import {fireEvent, render, screen} from "@testing-library/react";
import NavItem from "../../../src/components/navigation/NavItem";
import {RouterMock} from "../../mocks/Router.mock";
import {afterEach} from "@jest/globals";
import React from "react";
import {GlobalContext} from "../../../src/context/GlobalContext";
import {MockGlobalContext} from "../../mocks/GlobalContext.mock";
import AuthAction from "../../../src/components/actions/AuthAction";
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
        afterEach(() => {
            jest.restoreAllMocks();
        });
        it('should display logout only and route on click', () => {
            const contextMock = { ...MockGlobalContext, isAuthenticated: true };
            // @ts-ignore
            global.fetch = jest.fn(() =>
                Promise.resolve({
                    json: () => Promise.resolve({ rates: { CAD: 1.42 } }),
                })
            );
            const dom = render(
                <GlobalContext.Provider value={contextMock}>
                    <AuthNav />
                </GlobalContext.Provider>
            );
            const container = dom.container;
            dom.debug()
            expect(() => getByText(container, 'Logout')).not.toThrow();
            expect(() => getByText(container, 'Login')).toThrow();
            expect(() => getByText(container, 'Register')).toThrow();
            fireEvent.click(getByText(container, 'Logout'));
            expect(routerMock.push).toHaveBeenCalledWith('/');
            expect(contextMock.setPerson).toHaveBeenCalled();
            expect(contextMock.setIsAuthenticated).toHaveBeenCalled();
            expect(global.fetch).toHaveBeenCalledWith('/api/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                }
            });
        });

    })
});
