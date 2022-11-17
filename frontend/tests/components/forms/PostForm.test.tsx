import "@testing-library/jest-dom";
import PostForm from "../../../src/components/forms/PostForm";
import {render} from "@testing-library/react";

describe("PostForm", () => {
    /**
     * Testing of general forms is being delegated
     * to the implementing page's test
     */
    xit('should create', () => {
        expect(render(<PostForm />)).toBeTruthy();
    });
});
