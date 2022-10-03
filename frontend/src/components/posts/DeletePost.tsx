import React from "react";
import {Flex, Text} from "@chakra-ui/core";

const DeletePost: React.FC<any> = ({ }) => {
    return (
        <Flex textAlign={'center'}>
            <Text>Are you sure you want to delete this post?</Text>
        </Flex>
    );
}

export default DeletePost;
