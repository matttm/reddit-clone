import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {GlobalContext} from "../../../src/context/GlobalContext";
import {MockGlobalContext} from "../../mocks/GlobalContext.mock";
import ActionBar from "../../../src/components/actions/ActionBar";
import {ModalContextProvider} from "../../../src/context/ModalContextProvider";
import {afterEach} from "@jest/globals";
import {ModalContext} from "../../../src/context/ModalContext";
import {MockModalContext} from "../../mocks/ModalContext.mock";
import {RouterMock} from "../../mocks/Router.mock";

const routerMock = {...RouterMock };
jest.mock('next/router', () => ({
    useRouter() {
        return routerMock;
    },
}));

describe("ActionBar", () => {
    describe('when unauthorized', () => {
        afterEach(() => {
            jest.restoreAllMocks();
        })
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
                <ModalContext.Provider value={{ ...MockModalContext, setModal }}>
                    <ActionBar />
                </ModalContext.Provider>
            </GlobalContext.Provider>
        );
        afterEach(() => {
            jest.restoreAllMocks();
        })
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
        it("call route on edit click", () => {
            const dom = render(html);
            const edit = dom.container.querySelector('#edit-icon');
            expect(edit).toBeTruthy();
            expect(edit).toBeInTheDocument();
            fireEvent.click(edit as Element);
            expect(routerMock.push).toHaveBeenCalled();
        });
    })
});
