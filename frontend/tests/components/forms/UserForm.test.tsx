
import "@testing-library/jest-dom";
import UserForm from "../../../src/components/forms/UserForm";
import {render} from "@testing-library/react";

describe("UserForm", () => {
    /**
     * Testing of general forms is being delegated
     * to the implementing page's test
     */
    xit('should create', () => {
        expect(render(<UserForm />)).toBeTruthy();
    });
});
