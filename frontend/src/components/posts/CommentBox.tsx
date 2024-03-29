import React, {useContext} from 'react';
import { InputField } from '../utilities/InpurField';
import { Button, Flex, Text } from '@chakra-ui/react';
import { Formik } from 'formik';
import {GlobalContext} from "../../context/GlobalContext";
import {InputTypeEnum} from "../../constants/input-type.constant";

/**
 * A text field and comment button for a user to comment on a post
 *
 * @constructor
 */
const CommentBox: React.FC<any> = () => {
    const { isAuthenticated } = useContext(GlobalContext);
    if (!isAuthenticated) {
        return (
            <Flex
                direction={'column'}
                padding={'30px'}
                border={'3px'}
                borderColor={'black'}
                alignItems={'center'}
                justifyItems={'center'}>
                <Text>You must have an account to comment.</Text>
                <Text>
                    <a href={'/login'}>Login</a> or{' '}
                    <a href={'/register'}>Register</a>
                </Text>
            </Flex>
        );
    }
    return (
        <Flex direction={'column'} padding={'40px'}>
            <Formik initialValues={{ comment: '' }} onSubmit={() => {}}>
                <form>
                    <InputField
                        name={'comment'}
                        label={'Post a comment'}
                        placeholder="..."
                        inputTypeString={InputTypeEnum.TEXTAREA}></InputField>
                    <Button marginTop={8} type="submit">
                        Comment
                    </Button>
                </form>
            </Formik>
        </Flex>
    );
};

export default CommentBox;
