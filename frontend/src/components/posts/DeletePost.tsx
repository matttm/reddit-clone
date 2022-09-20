import React from "react";

const DeletePost: React.FC<any> = ({ postId, children }) => {
    // const [, deletePost] = useDeletePost();
    return (
        <>
            <p>
                Are you sure you want to delete this post?
            </p>
            <form>
                <button type={'submit'}>Confirm</button>
                <button>Cancel</button>
            </form>
        </>
    );
}

export default DeletePost;
