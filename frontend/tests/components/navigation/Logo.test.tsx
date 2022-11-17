
import "@testing-library/jest-dom";
import {getByText} from "@testing-library/dom";
import {render} from "@testing-library/react";
import Logo from "../../../src/components/navigation/Logo";

describe("Logo", () => {
    it('should render', () => {
        expect(() => render(<Logo />).getByText('The Clone')).not.toThrow();
    })
});
