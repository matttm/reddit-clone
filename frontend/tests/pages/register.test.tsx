import Home from "../../src/pages";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Register from "../../src/pages/register";
import {ThemeProvider} from "@chakra-ui/core";


jest.mock('../../src/generated/graphql', () => ({
    execute: jest.fn(),
    useRegisterMutation: jest.fn(() => this.execute)
}));

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
        expect(registerMock.useRegisterMutation).toHaveBeenCalled();
    });
});
