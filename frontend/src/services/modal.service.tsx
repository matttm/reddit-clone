import {func} from "prop-types";
import DeletePostWithConfirmation from "../components/posts/DeletePostWithConfirmation";
import {MODAL_COMPONENTS} from "../constants/model-components.constant";

export function getModalSelection(modalComponent: string, props: any) {
    switch (modalComponent) {
        case MODAL_COMPONENTS.DeleteComponent:
            return <DeletePostWithConfirmation />;
        default:
            return null;
    }
}
