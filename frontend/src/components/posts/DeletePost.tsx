import React from "react";
import {Text} from "@chakra-ui/core";

const DeletePost: React.FC<any> = ({ postId, children }) => {
    return (
        <>
            <Text>Are you sure you want to delete this post?</Text>
        </>
    );
}

export default DeletePost;
