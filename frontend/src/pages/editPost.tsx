import React from 'react';
import {Formik} from 'formik';
import Wrapper from '../components/utilities/Wrapper';
import {VariantsEnum} from '../types';
import {usePostQuery, useUpdatePostMutation} from '../generated/graphql';
import * as Yup from 'yup';
import {useRouter} from 'next/router';
import PostForm from "../components/forms/PostForm";

export const CreatePost: React.FC<any> = ({}) => {
    const router = useRouter();
    const [, update] = useUpdatePostMutation();
    let initialTitle = '';
    let initialBody = '';
    // if an id is present, we're going to edit
    const id = router.query.id;
    if (typeof id !== 'string') {
        return <p>Error</p>;
    }
    const [result, reexecuteQuery] = usePostQuery({variables: {id: +id}});
    const data = result.data?.post;
    const title = data?.title;
    const body = data?.body;
    // assert valid data, not an error
    if (title && body) {
        initialTitle = data?.title;
        initialBody = data?.body;
    }
    return (
        <Formik
            initialValues={{id: +id, title: initialTitle, body: initialBody}}
            validationSchema={Yup.object().shape({})}
            onSubmit={async (values, {setErrors}) => {
                const res = await update(values);
                if (res.error) {
                    console.error(`Error: ${res.error}`);
                    const m = {};
                    setErrors(m);
                }
                router.push('/');
                return res;
            }}>
            {({isSubmitting}) => (
                <PostForm
                    isSubmitting={isSubmitting}
                    buttonText={'Update'}
                />
            )}
        </Formik>
    );
};

export default CreatePost;
