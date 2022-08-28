import React from 'react';
import { usePostQuery } from '../../generated/graphql';
import { Flex, FormHelperText, Text } from '@chakra-ui/core';
import { useRouter } from 'next/router';

export const Id: React.FC<any> = () => {
    const router = useRouter();
    const { id } = router.query;
    if (!id) {
        return <p>No id provided</p>;
    }
    const [result, reexecuteQuery] = usePostQuery({ variables: { id: +id } });
    const { data, fetching, error } = result;

    console.log(result);
    if (fetching) return <p>Loading...</p>;
    if (error) return <p>Oh no... {error.message}</p>;
    if (!data) return <p>Data is corrupt</p>;
    return (
        <Flex direction={'column'}>
            <Text>{data.post.title}</Text>
        </Flex>
    );
};

export default Id;
