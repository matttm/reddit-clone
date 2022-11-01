import {render, screen} from "@testing-library/react";
import Action from "../../src/components/actions/Action";
import "@testing-library/jest-dom";
import {Simulate} from "react-dom/test-utils";

describe("Action", () => {
    it("render print the children", () => {
        render(
            <Action>
                Children
            </Action>
        );
        // check if all components are rendered
        expect(screen.queryByText("Children")).toBeInTheDocument();
    });
    it("execute csllback on click", () => {
        const fn = jest.fn();
        const wrapper = render(
            <Action action={fn}>
                Children
            </Action>
        );
        Simulate.click(wrapper.container.getElementsByTagName(Action.name)[0]);
        // check if all components are rendered
        expect(fn).toHaveBeenCalled();
    });
});
