import React from 'react';
import { Form, Formik } from 'formik';
import Wrapper from '../components/utilities/Wrapper';
import { InputTypeEnum, VariantsEnum } from '../types';
import { InputField } from '../components/utilities/InpurField';
import { Button } from '@chakra-ui/core';
import {useCreatePostMutation, usePostQuery} from '../generated/graphql';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import {bind} from "@wry/context";
import PostForm from "../components/posts/PostForm";

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
                    <PostForm
                        isSubmitting={isSubmitting}
                        buttonText={'Create'}
                    />
                )}
            </Formik>
        </Wrapper>
    );
};

export default CreatePost;
