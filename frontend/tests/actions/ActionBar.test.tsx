import {fireEvent, render, screen} from "@testing-library/react";
import Action from "../../src/components/actions/Action";
import "@testing-library/jest-dom";
import {Simulate} from "react-dom/test-utils";
import {GlobalContext} from "../../src/context/GlobalContext";
import AuthAction from "../../src/components/actions/AuthAction";

const MockGlobalContext = {
    person: null,
    isAuthenticated: false,
    loading: true,
    setLoading: () => {},
    setIsAuthenticated: () => {},
    setPerson: () => {}
};

describe("ActionBar", () => {
    it("render display lock if unauthorized", () => {
        render(
            <GlobalContext.Provider value={{ ...MockGlobalContext, isAuthenticated: false }}>
                <AuthAction></AuthAction>
            </GlobalContext.Provider>
        );
        expect(screen.getByTitle("lock-icon")).toBeInTheDocument();
    });
});
