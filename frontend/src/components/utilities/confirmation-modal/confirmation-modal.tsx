import {GlobalContext} from "../../../context/GlobalContext";
import Wrapper from "../Wrapper";
import {Form, Formik} from "formik";
import Router from "next/router";
import {Button, Flex} from "@chakra-ui/core";
import {useContext} from "react";
import {VariantsEnum} from "../../../types";
import {Exact} from "../../../generated/graphql";
import {UseMutationResponse} from "urql";
import {ModalContext} from "../../../context/ModalContext";

export function withConfirmationModal(Component: React.FC, useMutationFn: () => UseMutationResponse<any, Exact<any>>): React.FC<any> {
    return (props) => {
        const { setModal } = useContext(ModalContext);
        const [, executeMutation] = useMutationFn();
        return (
            <>
                <Wrapper variant={VariantsEnum.regular.description}>
                    <Formik
                        initialValues={{}}
                        onSubmit={async (values) => {
                            Router.push('/');
                            return values;
                        }}>
                        {({ isSubmitting }) => (
                            <Form>
                                <Flex direction={'column'}>
                                    <Component />
                                    <Flex direction={'row'} justifyContent={'space-around'}>
                                        <Button
                                            marginTop={8}
                                            type="submit"
                                            isLoading={isSubmitting}
                                            variantColor="green">
                                            Confirm
                                        </Button>
                                        <Button
                                            marginTop={8}
                                            isLoading={isSubmitting}
                                            onClick={() => setModal(false)}
                                            variantColor="gray">
                                            Close
                                        </Button>
                                    </Flex>
                                </Flex>
                            </Form>
                        )}
                    </Formik>
                </Wrapper>
            </>
        );
    }
}
