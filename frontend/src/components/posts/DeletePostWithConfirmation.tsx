import DeletePost from "./DeletePost";
import {withConfirmationModal} from "../utilities/confirmation-modal/confirmation-modal";
import {useDeletePostMutation} from "../../generated/graphql";

const DeletePostWithConfirmation = withConfirmationModal(DeletePost, useDeletePostMutation);

export default DeletePostWithConfirmation;
