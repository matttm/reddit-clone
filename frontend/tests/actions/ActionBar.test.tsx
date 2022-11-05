import {fireEvent, queryByAttribute, render, screen} from "@testing-library/react";
import Action from "../../src/components/actions/Action";
import "@testing-library/jest-dom";
import {Simulate} from "react-dom/test-utils";
import {GlobalContext} from "../../src/context/GlobalContext";
import AuthAction from "../../src/components/actions/AuthAction";
import {MockGlobalContext} from "../mocks/GlobalContext.mock";
import ActionBar from "../../src/components/actions/ActionBar";
import {ModalContextProvider} from "../../src/context/ModalContextProvider";

const routerMock = {
    route: '/',
    pathname: '',
    query: '',
    asPath: '',
    push: jest.fn(),
    events: {
        on: jest.fn(),
        off: jest.fn()
    },
    beforePopState: jest.fn(() => null),
    prefetch: jest.fn(() => null)
};

jest.mock('next/router', () => ({
    useRouter() {
        return ({ ...routerMock });
    },
}));

describe("ActionBar", () => {
    describe('when unauthorized', () => {
        it("render display two locks", () => {
            const setModal = jest.fn();
            const dom = render(
                <GlobalContext.Provider value={{...MockGlobalContext, isAuthenticated: false}}>
                    <ModalContextProvider value={{setModal}}>
                        <ActionBar/>
                    </ModalContextProvider>
                </GlobalContext.Provider>
            );
            const trash = dom.container.querySelector('#delete-action');
            const edit = dom.container.querySelector('#edit-action');
            expect(trash).toBeTruthy();
            expect(edit).toBeTruthy();
            expect(trash).toBeInTheDocument();
            expect(edit).toBeInTheDocument();
            expect(screen.getAllByTitle("lock-icon").length).toBe(2);
        });
    });
    describe('when authorized', () => {
        const setModal = jest.fn();
        const html = (
            <GlobalContext.Provider value={{ ...MockGlobalContext, isAuthenticated: true }}>
                <ModalContextProvider value={{ setModal }}>
                    <ActionBar />
                </ModalContextProvider>
            </GlobalContext.Provider>
        );
        it("render display icons", () => {
            const dom = render(html);
            let trash = dom.container.querySelector('#delete-action');
            let edit = dom.container.querySelector('#edit-action');
            expect(trash).toBeTruthy();
            expect(edit).toBeTruthy();
            expect(trash).toBeInTheDocument();
            expect(edit).toBeInTheDocument();
            trash = dom.container.querySelector('#delete-icon');
            edit = dom.container.querySelector('#edit-icon');
            expect(trash).toBeTruthy();
            expect(edit).toBeTruthy();
            expect(trash).toBeInTheDocument();
            expect(edit).toBeInTheDocument();
            expect(() => screen.getAllByTitle("lock-icon")).toThrow();
        });
        it("call setModal on delete click", () => {
            const dom = render(html);
            const trash = dom.container.querySelector('#delete-icon');
            expect(trash).toBeTruthy();
            expect(trash).toBeInTheDocument();
            fireEvent.click(trash as Element);
            expect(setModal).toHaveBeenCalled();
        });
        it("call route on delete click", () => {
            const dom = render(html);
            const edit = dom.container.querySelector('#edit-icon');
            expect(edit).toBeTruthy();
            expect(edit).toBeInTheDocument();
            fireEvent.click(edit as Element);
            expect(routerMock.push).toHaveBeenCalled();
        });
    })
});
