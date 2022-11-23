
import "@testing-library/jest-dom";
import {getByText, waitFor} from "@testing-library/dom";
import {fireEvent, render, RenderResult} from "@testing-library/react";
import {GlobalContext} from "../../../../src/context/GlobalContext";
import {ModalContext} from "../../../../src/context/ModalContext";
import {Text, ThemeProvider} from "@chakra-ui/core";
import {withConfirmationModal} from "../../../../src/components/utilities/confirmation-modal/confirmation-modal";
import {MockGlobalContext} from "../../../mocks/GlobalContext.mock";
import {MockModalContext} from "../../../mocks/ModalContext.mock";
import {beforeEach} from "@jest/globals";
import {awaitExpression} from "@babel/types";

describe("ConfirmationModal", () => {
    const dummyContent = () => <Text>Dummy</Text>;
    const mutationFake = jest.fn();
    const useMutationFake = jest.fn(() => [
        null,
        mutationFake
    ]) as any;
    const DummyComponent = withConfirmationModal(dummyContent, useMutationFake);
    const html = (
        <ThemeProvider>
            <GlobalContext.Provider value={{...MockGlobalContext}}>
                <ModalContext.Provider value={{...MockModalContext}}>
                    <DummyComponent></DummyComponent>
                </ModalContext.Provider>
            </GlobalContext.Provider>
        </ThemeProvider>
    );
    let dom: RenderResult<typeof import("@testing-library/dom/types/queries"), HTMLElement, HTMLElement>;
    beforeEach(() => {
        dom = render(html);
    })
    afterEach(() => {
        jest.restoreAllMocks();
    });
    it('should render component',  () => {
        expect(() => dom.getByText('Dummy')).not.toThrow();
        expect(useMutationFake).toHaveBeenCalled();
    });
    it('should call mutation on click', async () => {
        expect(() => dom.getByText('Dummy')).not.toThrow();
        fireEvent.click(dom.getByText('Confirm'));
        await waitFor(() => {
            expect(mutationFake).toHaveBeenCalled();
        });
    });
});
