import React from 'react';
import { InputField } from '../utilities/InpurField';
import { InputTypeEnum } from '../../types';
import { Button, Flex } from '@chakra-ui/core';

const CommentBox: React.FC<any> = () => {
    return (
        <Flex direction={'column'} padding={'10px'}>
            <InputField
                name={'comment-box'}
                label={'Post a comment'}
                placeholder="body"
                inputTypeString={InputTypeEnum.TEXTAREA}></InputField>
            <Button marginTop={8} type="submit" variantColor="green">
                Create
            </Button>
        </Flex>
    );
};

export default CommentBox;
