import React from 'react';
import { InputField } from '../utilities/InpurField';
import { InputTypeEnum } from '../../types';
import { Button, Flex } from '@chakra-ui/core';
import { Formik } from 'formik';

const CommentBox: React.FC<any> = () => {
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
