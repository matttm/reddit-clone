import React from 'react';
import { Formik, Form, FormikErrors } from 'formik';
import Wrapper from '../components/Wrapper';
import { VariantsEnum } from '../types';
import { InputField } from '../components/InpurField';
import { Button } from '@chakra-ui/core';
import { useRegisterMutation } from '../generated/graphql';

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
    const [, register] = useRegisterMutation();
    console.log(useRegisterMutation());
    return (
        <Wrapper variant={VariantsEnum.regular.description}>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values, { setErrors }) => {
                    // @ts-ignore
                    const res = await register(values);
                    // @ts-ignore
                    // if (res?.errors?.length > 0 || res?.status >= 400) {
                    //     const m: FormikErrors<string> = {};
                    //     m['username'] = 'Unusable name or password';
                    //     m['password'] = 'Unusable name or password';
                    //     setErrors(m);
                    // }
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
