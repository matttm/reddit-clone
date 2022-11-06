import {Flex} from '@chakra-ui/core';
import AuthAction from './AuthAction';
import React, {useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {faPencil, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {ModalContext} from "../../context/ModalContext";
import {MODAL_COMPONENTS} from "../../constants/model-components.constant";
import {useRouter} from "next/router";

/**
 * A horizontal bar displaying the actions available for a post
 *
 * @param creatorId
 * @param postId
 * @constructor
 */
const ActionBar: React.FC<any> = ({ creatorId, postId }) => {
    const router = useRouter();
    const { setModal } = useContext(ModalContext);
    return (
        <Flex direction={'row'} justifyContent={'flex-end'}>
            <div id={'edit-action'}>
                <AuthAction action={() => {
                    router.push(`/editPost?id=${postId}`);
                }} creatorId={creatorId}>
                    <FontAwesomeIcon id={'edit-icon'} icon={faPencil}></FontAwesomeIcon>
                </AuthAction>
            </div>
            <div id={'delete-action'} >
                <AuthAction action={() => {
                    setModal(true, MODAL_COMPONENTS.DeleteComponent, { postId  });
                }} creatorId={creatorId}>
                    <FontAwesomeIcon id={'delete-icon'} icon={faTrashCan}></FontAwesomeIcon>
                </AuthAction>
            </div>
        </Flex>
    );
};

export default ActionBar;
