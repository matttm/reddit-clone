import React from 'react';
import { InputField } from '../utilities/InpurField';
import { InputTypeEnum } from '../../types';
import { Button, Flex, Text } from '@chakra-ui/core';
import { Formik } from 'formik';
import { isAuthenticated } from '../../services/authentication.service';

const CommentBox: React.FC<any> = () => {
    if (!isAuthenticated()) {
        return (
            <Flex
                direction={'column'}
                padding={'30px'}
                border={'3px'}
                borderColor={'black'}
                alignItems={'center'}
                justifyItems={'center'}>
                <Text>You must have an account to comment.</Text>
                <Text>
                    <a href={'/login'}>Login</a> or{' '}
                    <a href={'/register'}>Register</a>
                </Text>
            </Flex>
        );
    }
    return (
        <Flex direction={'column'} padding={'10px'}>
            <Formik initialValues={{ comment: '' }} onSubmit={() => {}}>
                <form>
                    <InputField
                        name={'comment'}
                        label={'Post a comment'}
                        placeholder="..."
                        inputTypeString={InputTypeEnum.TEXTAREA}></InputField>
                    <Button marginTop={8} type="submit" variantColor="green">
                        Comment
                    </Button>
                </form>
            </Formik>
        </Flex>
    );
};

export default CommentBox;
