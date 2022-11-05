import {fireEvent, queryByAttribute, render, screen} from "@testing-library/react";
import Action from "../../src/components/actions/Action";
import "@testing-library/jest-dom";
import {Simulate} from "react-dom/test-utils";
import {GlobalContext} from "../../src/context/GlobalContext";
import AuthAction from "../../src/components/actions/AuthAction";
import {MockGlobalContext} from "../mocks/GlobalContext.mock";
import ActionBar from "../../src/components/actions/ActionBar";
import {ModalContextProvider} from "../../src/context/ModalContextProvider";

describe("ActionBar", () => {
    it("render display two locks if unauthorized", () => {
        const getById = queryByAttribute.bind(null, 'id');
        const setModal = jest.fn();
        const dom = render(
            <GlobalContext.Provider value={{ ...MockGlobalContext, isAuthenticated: false }}>
                <ModalContextProvider value={{ setModal }}>
                    <ActionBar />
                </ModalContextProvider>
            </GlobalContext.Provider>
        );
        expect(getById(dom.container, 'edit-action')).toBeInTheDocument();
        expect(getById(dom.container, 'delete-action')).toBeInTheDocument();
        expect(screen.getAllByTitle("lock-icon").length).toBe(2);
    });
});
