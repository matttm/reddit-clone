import "@testing-library/jest-dom";
import {fireEvent, render, waitFor} from "@testing-library/react";
import {RouterMock} from "../../mocks/Router.mock";
import {afterEach, beforeEach} from "@jest/globals";
import React from "react";
import {GlobalContext} from "../../../src/context/GlobalContext";
import {MockGlobalContext} from "../../mocks/GlobalContext.mock";
import AuthNav from "../../../src/components/navigation/AuthNav";
import {getByText} from "@testing-library/dom";
import {Navbar} from "../../../src/components/navigation/Navbar";

const routerMock = { ...RouterMock };
jest.mock('next/router', () => ({
    useRouter() {
        return routerMock;
    },
}));
describe("Navbar", () => {
    describe('when logged out', () => {
        beforeEach(() => {
            jest.restoreAllMocks();
        });
        it('should display all links', () => {
            const contextMock = { ...MockGlobalContext, isAuthenticated: false };
            const dom = render(
                <GlobalContext.Provider value={contextMock}>
                    <Navbar />
                </GlobalContext.Provider>
            );
            const container = dom.container;
            expect(() => getByText(container, 'Logout')).toThrow();
            expect(() => getByText(container, 'The Clone')).not.toThrow();
            expect(() => getByText(container, 'Login')).not.toThrow();
            expect(() => getByText(container, 'Register')).not.toThrow();
            expect(() => getByText(container, 'Create Post')).not.toThrow();
            expect(() => getByText(container, 'Posts')).not.toThrow();
        });
    });
});
