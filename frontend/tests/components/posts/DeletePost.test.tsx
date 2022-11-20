import "@testing-library/jest-dom";
import {beforeEach} from "@jest/globals";
import React from "react";
import {render} from "@testing-library/react";
import DeletePost from "../../../src/components/posts/DeletePost";

describe("DeletePost", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    const html = (
        <DeletePost />
    );
    it('should display text', () => {
        const dom = render(html);
        expect(() => dom.getByText('Are you sure you want to delete this post?')).not.toThrow();
    })
});
