import React from 'react';
import { Formik, Form } from 'formik';
import Wrapper from '../components/Wrapper';
import { VariantsEnum } from '../types';
import { InputField } from '../components/InpurField';
import { Button } from '@chakra-ui/core';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../generated/graphql';
import { setErrors } from '@graphql-tools/utils';
import { GraphQLError } from 'graphql';

interface registerProps {}

export const Register: React.FC<registerProps> = ({}) => {
    const [register] = useRegisterMutation();
    return (
        <Wrapper variant={VariantsEnum.regular.description}>
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values, actions) => {
                    // @ts-ignore
                    const res = await register(values);
                    // @ts-ignore
                    if (res?.errors?.length > 0) {
                        setErrors('', [
                            new GraphQLError('Unusable name or password')
                        ]);
                    }
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
