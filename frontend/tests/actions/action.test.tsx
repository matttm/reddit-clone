import {render, screen} from "@testing-library/react";
import Action from "../../src/components/actions/Action";
import "@testing-library/jest-dom";

describe("Action", () => {
    it("render print the children", () => {
        render(
            <Action>
                Children
            </Action>
        );
        // check if all components are rendered
        expect(screen.getByText("Children")).toBeInTheDocument();
    });
});
