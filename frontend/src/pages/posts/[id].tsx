import React from 'react';
import { usePostQuery } from '../../generated/graphql';
import { Flex, FormHelperText, Text } from '@chakra-ui/core';
import { useRouter } from 'next/router';
import { CommentNode } from 'node-html-parser';
import CommentBox from '../../components/posts/CommentBox';

export const Id: React.FC<any> = () => {
    const router = useRouter();
    const { id } = router.query;
    if (!id) {
        return <p>No id provided</p>;
    }
    const [result, reexecuteQuery] = usePostQuery({ variables: { id: +id } });
    const { data, fetching, error } = result;
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    if (!data) return <p>Data is corrupt</p>;
    return (
        <Flex direction={'column'}>
            <Text fontSize={'18px'} fontWeight={'bold'}>
                {data.post.title}
            </Text>
            <Text fontSize={'14px'} fontWeight={'light'}>
                Created at {data.post.createdAt}
            </Text>
            <Text fontSize={'16px'}>{data.post.body}</Text>
            <CommentBox></CommentBox>
        </Flex>
    );
};

export default Id;
