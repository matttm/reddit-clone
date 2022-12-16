import {GlobalContext} from "../../../context/GlobalContext";
import Wrapper from "../Wrapper";
import {Form, Formik} from "formik";
import Router from "next/router";
import {Button, Flex} from '@chakra-ui/react';
import {useContext} from "react";
import {Exact} from "../../../generated/graphql";
import {UseMutationResponse} from "urql";
import {ModalContext} from "../../../context/ModalContext";
import {VariantsEnum} from "../../../constants/variant.constant";

/**
 * A higher order component that encapsulates an existing component in a modal
 *
 * @param Component component to be put in a modal
 * @param useMutationFn the mutation for submission
 */
export function withConfirmationModal(Component: React.FC, useMutationFn: () => UseMutationResponse<any, Exact<any>>): React.FC<any> {
    return (props) => {
        const { setLoading, loading } = useContext(GlobalContext);
        const { setModal, modalProps } = useContext(ModalContext);
        const [, executeMutation] = useMutationFn();
        return (
            <>
                <Wrapper variant={VariantsEnum.regular.description}>
                    <Flex direction={'column'}>
                        <Flex justifyContent={'center'}>
                            <Component />
                        </Flex>
                        <Flex direction={'row'} justifyContent={'space-around'}>
                            <Button
                                marginTop={8}
                                onClick={async (values) => {
                                    console.log('gettin clicked')
                                    setLoading(true);
                                    await executeMutation({ id: modalProps.postId });
                                    setModal(false);
                                    setLoading(false);
                                    Router.push('/');
                                    return values;
                                }}
                                isDisabled={loading}
                            >
                                Confirm
                            </Button>
                            <Button
                                marginTop={8}
                                onClick={() => setModal(false)}
                                isDisabled={loading}
                            >
                                Cancel
                            </Button>
                        </Flex>
                    </Flex>
                </Wrapper>
            </>
        );
    }
}
