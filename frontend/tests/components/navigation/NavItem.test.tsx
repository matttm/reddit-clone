
import "@testing-library/jest-dom";
import {getByText} from "@testing-library/dom";
import {render} from "@testing-library/react";
import Logo from "../../../src/components/navigation/Logo";
import NavItem from "../../../src/components/navigation/NavItem";

describe("NavItem", () => {
    it('should render children in a link', () => {
        const dom = render(
            <NavItem>
                children
            </NavItem>
        );
        const link = dom.container.querySelector('Link');
        expect(link).toBeTruthy();
        expect(link?.innerHTML).toEqual('children');
    })
});
