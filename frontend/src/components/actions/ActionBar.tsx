import {Flex} from '@chakra-ui/core';
import AuthAction from './AuthAction';
import React, {useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {faPencil, faTrashCan} from '@fortawesome/free-solid-svg-icons';
import {ModalContext} from "../../context/ModalContext";
import {MODAL_COMPONENTS} from "../../constants/model-components.constant";

const ActionBar: React.FC<any> = ({ creatorId, postId }) => {
    const { setModal } = useContext(ModalContext);
    console.log('action b postid', postId)
    return (
        <Flex direction={'row'} justifyContent={'flex-end'}>
            <AuthAction creatorId={creatorId}>
                <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
            </AuthAction>
            <AuthAction action={() => {
                setModal(true, MODAL_COMPONENTS.DeleteComponent, { postId  });
            }} creatorId={creatorId}>
                <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
            </AuthAction>
        </Flex>
    );
};

export default ActionBar;
