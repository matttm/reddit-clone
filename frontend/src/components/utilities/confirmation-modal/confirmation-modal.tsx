import {GlobalContext} from "../../../context/GlobalContext";
import Wrapper from "../Wrapper";
import {Formik} from "formik";
import {useRouter} from "next/router";
import {Button, Flex} from "@chakra-ui/core";
import {useContext} from "react";
import {VariantsEnum} from "../../../types";
import {Exact, useDeletePostMutation} from "../../../generated/graphql";
import {UseMutationResponse} from "urql";

export function withConfirmationModal(Component: React.FC, useMutationFn: () => UseMutationResponse<any, Exact<any>>): React.FC<any> {
    return ({ postId, children }) => {
        const { modalService } = useContext(GlobalContext);
        const router = useRouter();
        const [, executeMutation] = useMutationFn();
        return (
            <>
                <Wrapper variant={VariantsEnum.regular.description}>
                    <Formik
                        initialValues={{ postId }}
                        onSubmit={async (values) => {
                            const res = await executeMutation(postId);
                            router.push('/posts');
                            return values;
                        }}>
                        {({ isSubmitting }) => (
                            <Flex direction={'column'}>
                                <Component />
                                <Flex direction={'row'}>
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
                                        onClick={() => modalService?.closeModal()}
                                        variantColor="gray">
                                        Close
                                    </Button>
                                </Flex>
                            </Flex>
                        )}
                    </Formik>
                </Wrapper>
            </>
        );
    }
}
