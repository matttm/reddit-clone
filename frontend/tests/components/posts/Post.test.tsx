import "@testing-library/jest-dom";
import {fireEvent, render} from "@testing-library/react";
import {RouterMock} from "../../mocks/Router.mock";
import {beforeEach} from "@jest/globals";
import React from "react";
import {getByText, waitFor} from "@testing-library/dom";
import {Navbar} from "../../../src/components/navigation/Navbar";
import Post from "../../../src/components/posts/Post";
import {Person} from "../../../src/generated/graphql";

const routerMock = { ...RouterMock };
jest.mock('next/router', () => ({
    useRouter() {
        return routerMock;
    },
}));
describe("Post", () => {
    const id = 1;
    const title = 'Help with the giant dragon';
    const date = '11-09-22';
    const person: Person = {createdAt: undefined, id: "", updatedAt: undefined, username: 'matttm' };
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    it('should display id, title, date, author', () => {
        const dom = render(
            <Post id={id} title={title} createdAt={date} person={person} />
        );
        const container = dom.container;
        expect(() => getByText(container, `Created by ${person.username} at ${date}`)).not.toThrow();
        expect(() => getByText(container, title)).not.toThrow();
    });
    it('should have hred to post details', async () => {
        const dom = render(
            <Post id={id} title={title} createdAt={date} person={person} />
        );
        const container = dom.container;
        const anchor = container.querySelector('a');
        expect(anchor).toHaveAttribute('href', `/posts/${id}`);
    });
});
