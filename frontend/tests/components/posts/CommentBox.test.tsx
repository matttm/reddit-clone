import "@testing-library/jest-dom";
import {beforeEach} from "@jest/globals";
import React from "react";
import {GlobalContext} from "../../../src/context/GlobalContext";
import {MockGlobalContext} from "../../mocks/GlobalContext.mock";
import CommentBox from "../../../src/components/posts/CommentBox";
import {render} from "@testing-library/react";
import {ChakraProvider, ThemeProvider} from '@chakra-ui/react';

describe("CommentBox", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    describe('when logged in', () => {
        const html = (
            <ChakraProvider>
                <GlobalContext.Provider value={{...MockGlobalContext, isAuthenticated: true }}>
                    <CommentBox />
                </GlobalContext.Provider>
            </ChakraProvider>
        );
        it('should have an input field', () => {
            const dom = render(html);
            expect(dom.container.querySelector('textarea')).toBeInTheDocument();
            expect(() => dom.getByText('Comment')).not.toThrow();
            expect(() => dom.getByText('You must have an account to comment.')).toThrow();
        })
    });
    describe('when not logged in', () => {
        const html = (
            <ChakraProvider>
                <GlobalContext.Provider value={{...MockGlobalContext, isAuthenticated: false }}>
                    <CommentBox />
                </GlobalContext.Provider>
            </ChakraProvider>
        );
        it('should not have an input field', () => {
            const dom = render(html);
            expect(dom.container.querySelector('textarea')).not.toBeInTheDocument();
            expect(() => dom.getByText('Comment')).toThrow();
            expect(() => dom.getByText('You must have an account to comment.')).not.toThrow();
        })
    });
});
