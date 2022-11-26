import "@testing-library/jest-dom";
import React from "react";
import {render} from "@testing-library/react";
import DeletePostWithConfirmation from "../../../src/components/posts/DeletePostWithConfirmation";

describe("DeletePostWithConfirmation", () => {
    //
    // testing for this component
    // has been delegated to the modals testing
    // for the HOC
    //
    xit('should create', () => {
        const dom = render(<DeletePostWithConfirmation />);
    })
});
