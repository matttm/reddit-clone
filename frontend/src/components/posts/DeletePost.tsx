import React from "react";
import {Flex, Text} from '@chakra-ui/react';

/**
 * The content of modal when deleting post
 *
 * @constructor
 */
const DeletePost: React.FC<any> = ({ }) => {
    return (
        <Flex textAlign={'center'}>
            <Text>Are you sure you want to delete this post?</Text>
        </Flex>
    );
}

export default DeletePost;
