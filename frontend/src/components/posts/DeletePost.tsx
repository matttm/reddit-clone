import React, {useContext} from "react";
import {useDeletePostMutation} from "../../generated/graphql";
import {Button, Flex, Text} from "@chakra-ui/core";
import Wrapper from "../utilities/Wrapper";
import {VariantsEnum} from "../../types";
import {Form, Formik} from "formik";
import {useRouter} from "next/router";
import {GlobalContext} from "../../context/GlobalContext";

const DeletePost: React.FC<any> = ({ postId, children }) => {
    const { modalService } = useContext(GlobalContext);
    const router = useRouter();
    const [, deletePost] = useDeletePostMutation();
    return (
        <>
            <Wrapper variant={VariantsEnum.regular.description}>
                <Formik
                    initialValues={{ postId }}
                    onSubmit={async (values) => {
                        const res = await deletePost(postId);
                        router.push('/posts');
                        return values;
                    }}>
                    {({ isSubmitting }) => (
                        <Flex direction={'column'}>
                            <Text>Are you sure you want to delete this post?</Text>
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

export default DeletePost;
