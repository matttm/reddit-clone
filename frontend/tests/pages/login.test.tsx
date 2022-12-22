import "@testing-library/jest-dom";
import {act, fireEvent, render, screen, waitFor} from "@testing-library/react";
import {RouterMock} from "../mocks/Router.mock";
import {beforeEach} from "@jest/globals";
import {ChakraProvider} from "@chakra-ui/react";
import Login from "../../src/pages/login";
import {GlobalContext} from "../../src/context/GlobalContext";
import {MockGlobalContext} from "../mocks/GlobalContext.mock";

const routerMock = { ...RouterMock };
jest.mock('next/router', () => ({
    useRouter() {
        return routerMock;
    },
}));
const fetchSpy = jest.spyOn(global, 'fetch').mockReturnValue(Promise.resolve({
    json: () => Promise.resolve({ login: {} })
}) as Promise<Response>)

describe("Login", () => {
    const html = (
        <GlobalContext.Provider value={MockGlobalContext}>
            <ChakraProvider>
                <Login />
            </ChakraProvider>
        </GlobalContext.Provider>
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
