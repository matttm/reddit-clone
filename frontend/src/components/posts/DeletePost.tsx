import React from "react";
import {useDeletePostMutation} from "../../generated/graphql";
import {Flex, Text} from "@chakra-ui/core";

const DeletePost: React.FC<any> = ({ postId, children }) => {
    const [, deletePost] = useDeletePostMutation();
    return (
        <>
            <Flex direction={'column'} color={'black'}>
                <Text>
                    Are you sure you want to delete this post?
                </Text>
                <form>
                    <button type={'submit'}>Confirm</button>
                    <button>Cancel</button>
                </form>
            </Flex>
        </>
    );
}

export default DeletePost;
