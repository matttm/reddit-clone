import {fireEvent, render, screen} from "@testing-library/react";
import "@testing-library/jest-dom";
import {GlobalContext} from "../../../src/context/GlobalContext";
import {MockGlobalContext} from "../../mocks/GlobalContext.mock";
import ActionBar from "../../../src/components/actions/ActionBar";
import {ModalContextProvider} from "../../../src/context/ModalContextProvider";
import {afterEach} from "@jest/globals";
import PostForm from "../../../src/components/forms/PostForm";
import {Formik} from "formik";
import * as Yup from "yup";
import {ColorModeProvider, ThemeProvider} from "@chakra-ui/core";

describe("PostForm", () => {
    afterEach(() => {
        jest.restoreAllMocks();
    })
    it("render display text on button", () => {
        const dom = render(
            <ThemeProvider>
                <Formik
                    initialValues={{title: '', body: ''}}
                    validationSchema={Yup.object().shape({})}
                    onSubmit={async (values, {setErrors}) => {
                    }}>
                    <PostForm buttonText={'Test'} isSubmitting={false} />
                </Formik>
            </ThemeProvider>
        );
        dom.debug();
        const el = dom.container.querySelector('button');
        expect(el).toBeTruthy();
        expect((el as HTMLElement).innerHTML).toContain('Test');
    });
});
