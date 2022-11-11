import "@testing-library/jest-dom";
import {render} from "@testing-library/react";
import NavItem from "../../../src/components/navigation/NavItem";
import {RouterMock} from "../../mocks/Router.mock";
import {afterEach} from "@jest/globals";
import {Box, CSSReset, Link, ThemeProvider} from "@chakra-ui/core";
import React from "react";

const routerMock = { ...RouterMock };
jest.mock('next/router', () => ({
    useRouter() {
        return routerMock;
    },
}));

describe("NavItem", () => {
    afterEach(() => {
        jest.resetModules();
    });
    it('should render children in a link', () => {
        routerMock.pathname = 'nowhere';
        const dom = render(
            <NavItem>
                children
            </NavItem>
        );
        const link = dom.container.querySelector('.navitem-link');
        expect(link).toBeTruthy();
        expect(link?.innerHTML).toEqual('children');
    });
    it('should have a border when navTo property is the route\'s psth', () => {
        routerMock.pathname = 'home';
        const dom = render(
            <NavItem navTo={'home'}>
                children
            </NavItem>
        );
        const container = dom.container.querySelector('.navitem-container');
        const link = dom.container.querySelector('.navitem-link');
        expect(container).toBeTruthy();
        expect(link).toBeTruthy();
        // @ts-ignore
        const containerStyle = getComputedStyle(container);
        expect(containerStyle.getPropertyValue('border')).toBe('1px');
        expect(containerStyle.getPropertyValue('border-bottom-color')).toBe('white');
    });
});
