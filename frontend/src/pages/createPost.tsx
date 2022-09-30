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

export const CreatePost: React.FC<any> = ({}) => {
    const router = useRouter();
    const [, post] = useCreatePostMutation();
    let initialTitle = '';
    let initialBody = '';
    // if an id is present, we're going to edit
    if (router.query?.id) {
        const [result, reexecuteQuery] = usePostQuery({ variables: { id: +router.query.id } });
        const data = result.data?.post;
        const title = data?.title;
        const body = data?.body;
        // assert valid data, not an error
        if (title && body) {
            initialTitle = data?.title;
            initialBody = data?.body;
        }
    }
    return (
        <Wrapper variant={VariantsEnum.regular.description}>
            <Formik
                initialValues={{ title: initialTitle, body: initialBody }}
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
