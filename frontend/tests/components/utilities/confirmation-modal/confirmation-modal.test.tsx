
import "@testing-library/jest-dom";
import {getByText} from "@testing-library/dom";
import {render} from "@testing-library/react";
import {GlobalContext} from "../../../../src/context/GlobalContext";
import {ModalContext} from "../../../../src/context/ModalContext";
import {Text} from "@chakra-ui/core";
import {withConfirmationModal} from "../../../../src/components/utilities/confirmation-modal/confirmation-modal";
import {MockGlobalContext} from "../../../mocks/GlobalContext.mock";
import {MockModalContext} from "../../../mocks/ModalContext.mock";

describe("ConfirmationModal", () => {
    const dummyContent = () => <Text>DUmmy</Text>;
    const fake = jest.fn();
    const dummyComponent = withConfirmationModal(dummyContent, fake);
    it('should', () => {
        const html = (
            <GlobalContext.Provider value={{...MockGlobalContext}} >
                <ModalContext.Provider value={{...MockModalContext}} >

                </ModalContext.Provider>
            </GlobalContext.Provider>
        )
        expect(() => render(html).getByText('The Clone')).not.toThrow();
    })
});
