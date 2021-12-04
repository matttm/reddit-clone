import React from 'react';
import { Formik, Form, FormikErrors } from 'formik';
import Wrapper from '../components/Wrapper';
import { VariantsEnum } from '../types';
import { InputField } from '../components/InpurField';
import { Button } from '@chakra-ui/core';
import { useRegisterMutation } from '../generated/graphql';
import * as Yup from 'yup';

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
    const [, register] = useRegisterMutation();
    console.log(useRegisterMutation());
    return (
        <Wrapper variant={VariantsEnum.regular.description}>
            <Formik
                initialValues={{ username: '', password: '' }}
                validationSchema={Yup.object().shape({
                    username: Yup.string()
                        .min(3, 'Must be more than 2 characters')
                        .required('Required'),
                    password: Yup.string()
                        .min(8, 'Must be more than 8 characters')
                        .required('Required')
                })}
                onSubmit={async (values, { setErrors }) => {
                    const res = await register(values);
                    if (!res?.data?.register) {
                        const m = {};
                        // @ts-ignore
                        m['username'] = 'Username is taken';
                        // @ts-ignore
                        // m['password'] = 'Unusable name or password';
                        setErrors(m);
                    }
                    return res;
                }}>
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                        />
                        <InputField
                            name="password"
                            placeholder="password"
                            label="Password"
                        />
                        <Button
                            marginTop={8}
                            type="submit"
                            isLoading={isSubmitting}
                            variantColor="green">
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default Register;
