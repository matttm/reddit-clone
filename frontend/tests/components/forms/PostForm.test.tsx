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
    it("render have button change color on submission", () => {
        let isSubmitting = false;
        const dom = render(
            <ThemeProvider>
                <Formik
                    initialValues={{title: '', body: ''}}
                    validationSchema={Yup.object().shape({})}
                    onSubmit={async (values, {setErrors}) => {
                    }}>
                    <PostForm buttonText={'Test'} isSubmitting={isSubmitting} />
                </Formik>
            </ThemeProvider>
        );
        const el = dom.container.querySelector('button');
        expect(el).toBeTruthy();
        expect((el as HTMLElement)).not.toHaveAttribute('disabled');
        isSubmitting = true;
        dom.debug();
        expect((el as HTMLElement)).toHaveAttribute('disabled');
    });
});
