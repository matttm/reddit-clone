import {fireEvent, render, screen} from "@testing-library/react";
import Action from "../../src/components/actions/Action";
import "@testing-library/jest-dom";
import {Simulate} from "react-dom/test-utils";
import {GlobalContext} from "../../src/context/GlobalContext";
import AuthAction from "../../src/components/actions/AuthAction";
import {MockGlobalContext} from "../mocks/GlobalContext.mock";

describe("AuthAction", () => {
    it("render display lock if unauthorized", () => {
        render(
            <GlobalContext.Provider value={{ ...MockGlobalContext, isAuthenticated: false }}>
                <AuthAction></AuthAction>
            </GlobalContext.Provider>
        );
        expect(screen.getByTitle("lock-icon")).toBeInTheDocument();
    });
    it("render not display lock if authorized", () => {
        render(
            <GlobalContext.Provider value={{ ...MockGlobalContext, isAuthenticated: true }}>
                <AuthAction></AuthAction>
            </GlobalContext.Provider>
        );
        expect(() => screen.getByTitle("lock-icon")).toThrow();
    });
});
