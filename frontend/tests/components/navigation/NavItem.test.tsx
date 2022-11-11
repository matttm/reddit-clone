import "@testing-library/jest-dom";
import {fireEvent, render} from "@testing-library/react";
import NavItem from "../../../src/components/navigation/NavItem";
import {RouterMock} from "../../mocks/Router.mock";
import {afterEach} from "@jest/globals";
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
        const container = dom.container.querySelector('.navitem-container') as Element;
        const link = dom.container.querySelector('.navitem-link') as Element;
        expect(container).toBeTruthy();
        expect(link).toBeTruthy();
        const containerStyle = getComputedStyle(container);
        const linkStyle = getComputedStyle(link);
        expect(containerStyle.getPropertyValue('border')).toBe('1px');
        expect(containerStyle.getPropertyValue('border-bottom-color')).toBe('white');
    });
    it('should not have a border when navTo property is not the route\'s psth', () => {
        routerMock.pathname = 'home';
        const dom = render(
            <NavItem navTo={'login'}>
                children
            </NavItem>
        );
        const container = dom.container.querySelector('.navitem-container') as Element;
        const link = dom.container.querySelector('.navitem-link') as Element;
        expect(container).toBeTruthy();
        expect(link).toBeTruthy();
        const containerStyle = getComputedStyle(container);
        const linkStyle = getComputedStyle(link);
        expect(containerStyle.getPropertyValue('border')).toBe('0px');
        expect(containerStyle.getPropertyValue('border-bottom-color')).toBe('white');
    });
    it('should not have a border when navTo property is not the route\'s psth', () => {
        const onClick = jest.fn();
        const dom = render(
            <NavItem navTo={'login'} onClick={onClick}>
                children
            </NavItem>
        );
        const item: Element = dom.container.querySelector('.navitem-link') as Element;
        expect(item).toBeTruthy();
        fireEvent.click(item);
        expect(onClick).toHaveBeenCalled();
    });
});
