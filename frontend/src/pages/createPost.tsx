import React from 'react';
import { Form, Formik } from 'formik';
import Wrapper from '../components/Wrapper';
import { InputTypeEnum, VariantsEnum } from '../types';
import { InputField } from '../components/InpurField';
import { Button } from '@chakra-ui/core';
import { useCreatePostMutation, useLoginMutation } from '../generated/graphql';
import * as Yup from 'yup';
import {
    passwordValidation,
    usernameValidation
} from '../validation/credentials.validation';
import { useRouter } from 'next/router';

export const CreatePost: React.FC<any> = ({}) => {
    const router = useRouter();
    const [, post] = useCreatePostMutation();
    return (
        <Wrapper variant={VariantsEnum.regular.description}>
            <Formik
                initialValues={{ title: '', body: '' }}
                validationSchema={Yup.object().shape({})}
                onSubmit={async (values, { setErrors }) => {
                    const res = await post(values);
                    if (res.error) {
                        console.error(`Error: ${res.error}`);
                        const m = {};
                        setErrors(m);
                    }
                    router.push('/');
                    return res;
                }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="title"
                            placeholder="title"
                            label="title"
                            inputTypeString={InputTypeEnum.TEXTAREA}
                        />
                        <InputField
                            name="body"
                            placeholder="body"
                            label="body"
                            inputTypeString={InputTypeEnum.TEXTAREA}
                        />
                        <Button
                            marginTop={8}
                            type="submit"
                            isLoading={isSubmitting}
                            variantColor="green">
                            Create
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default CreatePost;
