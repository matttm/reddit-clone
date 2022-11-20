import "@testing-library/jest-dom";
import {beforeEach} from "@jest/globals";
import React from "react";
import {GlobalContext} from "../../../src/context/GlobalContext";
import {MockGlobalContext} from "../../mocks/GlobalContext.mock";
import CommentBox from "../../../src/components/posts/CommentBox";

describe("CommentBox", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    describe('when logged in', () => {
        const html = (
            <GlobalContext.Provider value={{...MockGlobalContext, isAuthenticated: true }}>
                <CommentBox />
            </GlobalContext.Provider>
        );
    });
    describe('when not logged in', () => {
        const html = (
            <GlobalContext.Provider value={{...MockGlobalContext, isAuthenticated: false }}>
                <CommentBox />
            </GlobalContext.Provider>
        );
    });
});
