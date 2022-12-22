import Home from "../../src/pages";
import "@testing-library/jest-dom";
import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import Register from "../../src/pages/register";
import * as graphql from '../../src/generated/graphql';
import {wait} from "next/dist/build/output/log";
import {RouterMock} from "../mocks/Router.mock";
import {beforeEach} from "@jest/globals";
import {ChakraProvider, ThemeProvider} from "@chakra-ui/react";
import Login from "../../src/pages/login";

const routerMock = { ...RouterMock };
jest.mock('next/router', () => ({
    useRouter() {
        return routerMock;
    },
}));

describe("Login", () => {
    const html = (
        <ChakraProvider>
            <Login />
        </ChakraProvider>
    );
    beforeEach(() => {
        jest.clearAllMocks();
    })
    it("render Home text", () => {
        render(html);
        // check if all components are rendered
        expect(screen.getByText("Login")).toBeInTheDocument();
    });
    describe('when valid input', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        })
        it('should execute mutation on valid input', async () => {
            let dom = render(html);

            // test throws 'act' error if I don't await it,
            // even though it does not return a promise
            await act(() => {
                fireEvent.change(dom.getByLabelText('Username'), {target: {value: 'matttm'}});
                fireEvent.change(dom.getByLabelText('Password'), {target: {value: 'password'}});
            });
            await act(() => {
                fireEvent.click(dom.getByText('Login'));
            });

            await waitFor(() => {
                expect(routerMock.push).toHaveBeenCalled();
            });
        });
    });
    describe('when invalid input', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        })
        it('should execute mutation on valid input', async () => {
            let dom = render(html);

            // test throws 'act' error if I don't await it,
            // even though it does not return a promise
            await act(() => {
                fireEvent.change(dom.getByLabelText('Username'), { target: { value: '' } } );
                fireEvent.change(dom.getByLabelText('Password'), { target: { value: '' } } );
            });
            await act(() => {
                fireEvent.click(dom.getByText('Login'));
            });

            await waitFor(() => {
                expect(routerMock.push).not.toHaveBeenCalled();
            });
        })
    })
});
