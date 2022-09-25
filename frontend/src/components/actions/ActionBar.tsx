import { Flex } from '@chakra-ui/core';
import AuthAction from './AuthAction';
import React, {useContext} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faPencil, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import DeletePost from "../posts/DeletePost";
import {GlobalContext} from "../../context/GlobalContext";
import DeletePostWithConfirmation from "../posts/DeletePostWithConfirmation";

const ActionBar: React.FC<any> = ({ creatorId, postId }) => {
    const { modalService } = useContext(GlobalContext);
    console.log('action b postid', postId)
    return (
        <Flex direction={'row'} justifyContent={'flex-end'}>
            <AuthAction creatorId={creatorId}>
                <FontAwesomeIcon icon={faPencil}></FontAwesomeIcon>
            </AuthAction>
            <AuthAction action={() => {
                // if (!modalService) {
                //     console.log('Service is undefined');
                //     return;
                // }
                // console.log('Service is defined', modalService);
                modalService?.openModal(
                    <DeletePostWithConfirmation postId={postId} />
                );
            }} creatorId={creatorId}>
                <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
            </AuthAction>
        </Flex>
    );
};

export default ActionBar;
