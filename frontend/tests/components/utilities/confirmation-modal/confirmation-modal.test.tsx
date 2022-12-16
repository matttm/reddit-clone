import "@testing-library/jest-dom";
import {waitFor} from "@testing-library/dom";
import {fireEvent, render, RenderResult} from "@testing-library/react";
import {GlobalContext} from "../../../../src/context/GlobalContext";
import {ModalContext} from "../../../../src/context/ModalContext";
import {Text, ThemeProvider} from '@chakra-ui/react';
import {withConfirmationModal} from "../../../../src/components/utilities/confirmation-modal/confirmation-modal";
import {MockGlobalContext} from "../../../mocks/GlobalContext.mock";
import {MockModalContext} from "../../../mocks/ModalContext.mock";
import {beforeEach} from "@jest/globals";

describe("ConfirmationModal", () => {
    const dummyContent = () => <Text>Dummy</Text>;
    const mutationFake = jest.fn(() => Promise.resolve());
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
        expect(() => dom.getByText('Confirm')).not.toThrow();
        fireEvent.click(dom.getByText('Confirm'));
        await waitFor(() => {
            expect(mutationFake).toHaveBeenCalled();
            expect(MockGlobalContext.setLoading).toHaveBeenCalledTimes(2);
            expect(MockModalContext.setModal).toHaveBeenCalled();
        });
    });
    it('should close modal on cancel click', async () => {
        expect(() => dom.getByText('Dummy')).not.toThrow();
        expect(() => dom.getByText('Cancel')).not.toThrow();
        fireEvent.click(dom.getByText('Cancel'));
        await waitFor(() => {
            expect(MockModalContext.setModal).toHaveBeenCalled();
        });
    });
});
