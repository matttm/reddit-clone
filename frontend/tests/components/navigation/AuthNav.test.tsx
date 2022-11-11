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
        it('should display logout only', () => {
            const dom = render(
                <GlobalContext.Provider value={{ ...MockGlobalContext, isAuthenticated: true }}>
                    <AuthNav />
                </GlobalContext.Provider>
            );
            const container = dom.container;
            expect(container.querySelector('#logout-nav-item')).toBeTruthy();
            expect(container.querySelector('#login-nav-item')).toBeFalsy();
            expect(container.querySelector('#register-nav-item')).toBeFalsy();
        });

    })
});
