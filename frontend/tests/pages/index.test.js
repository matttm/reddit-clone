import Home from "../../src/pages";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Home", () => {
    it("render Home text", () => {
        render(<Home />);
        // check if all components are rendered
        expect(screen.getByText("Home")).toBeInTheDocument();
    });
});
