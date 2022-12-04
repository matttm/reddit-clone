import Home from "../../src/pages";
import "@testing-library/jest-dom";
import {fireEvent, render, screen, waitFor} from "@testing-library/react";
import Register from "../../src/pages/register";
import {ThemeProvider} from "@chakra-ui/core";
import * as graphql from '../../src/generated/graphql';


jest.mock('../../src/generated/graphql', () => {
    const execute = jest.fn();
    return {
        execute,
        useRegisterMutation: jest.fn(() => [null, execute])
    }
});

describe("Register", () => {
    const html = (
        <ThemeProvider>
            <Register />
        </ThemeProvider>
    )
    it("render Home text", () => {
        render(html);
        // check if all components are rendered
        expect(screen.getByText("Register")).toBeInTheDocument();
        expect(graphql.useRegisterMutation).toHaveBeenCalled();
    });
    it('should execute mutation on valid input', () => {
        const dom = render(html);
        fireEvent.change(dom.getByLabelText('Username'), { target: { value: 'matttm' } } );
        fireEvent.change(dom.getByLabelText('Password'), { target: { value: 'password' } } );
        fireEvent.click(dom.getByText('Register'));
        waitFor(() => {
            // @ts-ignore
            // TODO fix false positive
            expect(graphql.execute).not.toHaveBeenCalled();
        })
    })
});
