import Home from "../../src/pages";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
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
});
