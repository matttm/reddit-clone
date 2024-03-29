import React from 'react';
import {Formik} from 'formik';
import Wrapper from '../components/utilities/Wrapper';
import {useCreatePostMutation} from '../generated/graphql';
import * as Yup from 'yup';
import {useRouter} from 'next/router';
import PostForm from "../components/forms/PostForm";
import {VariantsEnum} from "../constants/variant.constant";

export const CreatePost: React.FC<any> = ({}) => {
    const router = useRouter();
    const [, post] = useCreatePostMutation();
    return (
        <Formik
            initialValues={{title: '', body: ''}}
            validationSchema={Yup.object().shape({})}
            onSubmit={async (values, {setErrors}) => {
                const res = await post(values);
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
                    buttonText={'Create'}
                />
            )}
        </Formik>
    );
};

export default CreatePost;
