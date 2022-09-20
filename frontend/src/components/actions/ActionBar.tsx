import { Flex } from '@chakra-ui/core';
import AuthAction from './AuthAction';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import {modalService} from "../../services/modal.service";
import DeletePost from "../posts/DeletePost";

const ActionBar: React.FC<any> = ({ creatorId }) => {
    return (
        <Flex direction={'row'} justifyContent={'flex-end'}>
            <AuthAction creatorId={creatorId}>
                <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
            </AuthAction>
            <AuthAction action={() => {
                if (!modalService) {
                    console.log('Service is undefined');
                    return;
                }
                console.log('Service is defined', modalService);
                modalService.openModal(DeletePost);
            }} creatorId={creatorId}>
                <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
            </AuthAction>
        </Flex>
    );
};

export default ActionBar;
