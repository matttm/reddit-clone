import React from 'react';
import { Flex, Text } from '@chakra-ui/core';

const Post: React.FC<any> = ({ title, person }) => {
    return (
        <Flex direction={'column'}>
            <Text>{title}</Text>
            <Text>Created by {person.username}</Text>
        </Flex>
    );
};

export default Post;
