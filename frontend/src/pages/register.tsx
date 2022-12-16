import React from 'react';
import { Form, Formik } from 'formik';
import Wrapper from '../components/utilities/Wrapper';
import { InputField } from '../components/utilities/InpurField';
import { Button } from '@chakra-ui/react';
import * as Yup from 'yup';
import {
    passwordValidation,
    usernameValidation
} from '../validation/credentials.validation';
import { Router, useRouter } from 'next/router';
import { useRegisterMutation } from '../generated/graphql';
import UserForm from "../components/forms/UserForm";
import {VariantsEnum} from "../constants/variant.constant";

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter();
    const [, register] = useRegisterMutation();
    return (
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={Yup.object().shape({
                    ...usernameValidation,
                    ...passwordValidation
                })}
                onSubmit={async (values, { setErrors }) => {
                    const res = await register(values);
                    if (!res?.data?.register) {
                        const m = {};
                        // @ts-ignore
                        m['username'] = 'Username is taken';
                        setErrors(m);
                    }
                    router.push('/');
                    return res;
                }}>
                {({ isSubmitting }) => (
                    <UserForm isSubmitting={isSubmitting} buttonText={'Register'} />
                )}
            </Formik>
    );
};

export default Register;
