import { Flex } from '@chakra-ui/core';
import AuthAction from './AuthAction';
import React, {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {GlobalContext} from "../../context/GlobalContext";
import DeletePostWithConfirmation from "../posts/DeletePostWithConfirmation";
import {ModalContext} from "../../context/ModalContext";

const ActionBar: React.FC<any> = ({ creatorId, postId }) => {
    const { setIsModalOpen, setModalComponent, setModalProps } = useContext(ModalContext);
    console.log('action b postid', postId)
    return (
        <Flex direction={'row'} justifyContent={'flex-end'}>
            <AuthAction creatorId={creatorId}>
                <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
            </AuthAction>
            <AuthAction action={() => {
                setIsModalOpen(true);
                setModalComponent('delete');
                setModalProps({ postId  });
            }} creatorId={creatorId}>
                <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
            </AuthAction>
        </Flex>
    );
};

export default ActionBar;
