import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import NavItem from "../../../src/components/navigation/NavItem";
import {RouterMock} from "../../mocks/Router.mock";

const routerMock = { ...RouterMock };
jest.mock('next/router', () => ({
    useRouter() {
        return routerMock;
    },
}));

describe("NavItem", () => {
    it('should render children in a link', () => {
        const dom = render(
            <NavItem>
                children
            </NavItem>
        );
        const link = dom.container.querySelector('.navitem-link');
        expect(link).toBeTruthy();
        expect(link?.innerHTML).toEqual('children');
    })
});
