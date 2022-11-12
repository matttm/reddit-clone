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
    afterEach(() => {
        jest.resetModules();
    });
    describe('when logged in', () => {
        it('should display logout only and route on click', () => {
            const dom = render(
                <GlobalContext.Provider value={{ ...MockGlobalContext, isAuthenticated: true }}>
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

        });

    })
});
