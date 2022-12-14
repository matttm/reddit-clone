import Home from "../../src/pages";
import "@testing-library/jest-dom";
import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import Register from "../../src/pages/register";
import {ThemeProvider} from "@chakra-ui/core";
import * as graphql from '../../src/generated/graphql';
import {wait} from "next/dist/build/output/log";
import {RouterMock} from "../mocks/Router.mock";
import {beforeEach} from "@jest/globals";

const routerMock = { ...RouterMock };
jest.mock('next/router', () => ({
    useRouter() {
        return routerMock;
    },
}));
const execute = jest.fn(() => Promise.resolve({}));
jest.mock('../../src/generated/graphql', () => {
    return {
        useRegisterMutation: jest.fn(() => [null, execute])
    }
});

describe("Register", () => {
    const html = (
        <ThemeProvider>
            <Register />
        </ThemeProvider>
    );
    beforeEach(() => {
        jest.restoreAllMocks();
    })
    it("render Home text", () => {
        render(html);
        // check if all components are rendered
        expect(screen.getByText("Register")).toBeInTheDocument();
        expect(graphql.useRegisterMutation).toHaveBeenCalled();
    });
    it('should execute mutation on valid input', async () => {
        const dom = render(html);

        await waitFor(() => {
            // @ts-ignore
            fireEvent.change(dom.container.querySelector('#username'), {target: {value: 'matttm'}});
            // @ts-ignore
            fireEvent.change(dom.container.querySelector('#password'), {target: {value: 'password'}});
        });
        await waitFor(() => {
            fireEvent.click(dom.getByText('Register'));
        });
        await waitFor(() => {
            expect(execute).not.toHaveBeenCalled();
            expect(routerMock.push).not.toHaveBeenCalled();
        });
    })
});
