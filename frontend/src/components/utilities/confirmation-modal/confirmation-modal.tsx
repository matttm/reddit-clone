import {GlobalContext} from "../../../context/GlobalContext";
import Wrapper from "../Wrapper";
import {Form, Formik} from "formik";
import {useRouter} from "next/router";
import {Button, Flex} from "@chakra-ui/core";
import {useContext} from "react";
import {VariantsEnum} from "../../../types";
import {Exact, useDeletePostMutation} from "../../../generated/graphql";
import {UseMutationResponse} from "urql";

export function withConfirmationModal(Component: React.FC, useMutationFn: () => UseMutationResponse<any, any>): React.FC<any> {
    return (props) => {
        const { modalService } = useContext(GlobalContext);
        const router = useRouter();
        console.log('button clickked', props)
        const [, executeMutation] = useMutationFn();
        return (
            <>
                <Wrapper variant={VariantsEnum.regular.description}>
                    <Formik
                        initialValues={{}}
                        onSubmit={async (values) => {
                            console.log('button clickked', props.postId)
                            const res = await executeMutation(+props.postId);
                            router.push('/posts');
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
                                            onClick={() => modalService?.closeModal()}
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