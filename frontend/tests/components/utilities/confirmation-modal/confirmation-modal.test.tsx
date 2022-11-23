
import "@testing-library/jest-dom";
import {getByText} from "@testing-library/dom";
import {render} from "@testing-library/react";
import {GlobalContext} from "../../../../src/context/GlobalContext";
import {ModalContext} from "../../../../src/context/ModalContext";
import {Text, ThemeProvider} from "@chakra-ui/core";
import {withConfirmationModal} from "../../../../src/components/utilities/confirmation-modal/confirmation-modal";
import {MockGlobalContext} from "../../../mocks/GlobalContext.mock";
import {MockModalContext} from "../../../mocks/ModalContext.mock";

describe("ConfirmationModal", () => {
    const dummyContent = () => <Text>Dummy</Text>;
    const mutationFake = jest.fn();
    const useMutationFake = jest.fn(() => [
        null,
        mutationFake
    ]) as any;
    const DummyComponent = withConfirmationModal(dummyContent, useMutationFake);
    it('should', () => {
        const html = (
            <ThemeProvider>
                <GlobalContext.Provider value={{...MockGlobalContext}} >
                    <ModalContext.Provider value={{...MockModalContext}} >
                        <DummyComponent></DummyComponent>
                    </ModalContext.Provider>
                </GlobalContext.Provider>
            </ThemeProvider>
        )
        expect(() => render(html).getByText('Dummy')).not.toThrow();
    })
});
