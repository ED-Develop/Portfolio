import React, {useState} from "react";
import style from './Comments.module.css';
import {TPostComment} from "../../../../../types/types";
import CommentsForm, {CommentsFormPropsType, TCommentsFormData} from "./CommentsForm";
import {Dispatch} from "redux";
import {DecoratedFormProps} from "redux-form/lib/reduxForm";
import CustomComment from "./CustomComment";

type PropsType = {
    comments: Array<TPostComment>
    avatar: string
    userId: number | null
    sendComment: (postId: string, content: string, formName: string) => void
    editComment: (postId: string, content: string, formName: string, commentId: string) => void
    postId: string
    deleteComment: (postId: string, commentId: string) => void
    destroy: (formName: string) => void
}

const Comments: React.FC<PropsType> = ({comments, avatar, userId, sendComment, postId, deleteComment, destroy, ...props}) => {
    const [editingComment, setEditingComment] = useState<TPostComment | null>(null);
    const [isInputFocus, toggleIsInputFocus] = useState(false);
    const [initialFormValue, setInitialFormValue] = useState<TCommentsFormData>();
    const FORM_NAME = `comments__${postId}`;

    const startEditing = (comment: TPostComment) => {
        if (!editingComment || editingComment.id !== comment.id) {
            setEditingComment(comment);
        }

        toggleIsInputFocus(true);
    };

    const replyComment = (userName: string) => {
        toggleIsInputFocus(true);
        setInitialFormValue(() => ({comment: `"@${userName}" `}));
    };

    const disableInputFocus = () => toggleIsInputFocus(false);

    const resetForm = () => {
        disableInputFocus();
        setEditingComment(null);
        destroy(FORM_NAME);
        setInitialFormValue(() => void 0);
    };

    const onSubmit = (
        formData: TCommentsFormData,
        dispatch: Dispatch,
        {form}: DecoratedFormProps<TCommentsFormData, CommentsFormPropsType>
    ) => {

        if (form && editingComment) {
            props.editComment(postId, formData.comment, form, editingComment.id);
        } else if (form) {
            sendComment(postId, formData.comment, form);
        }

        if (editingComment || initialFormValue) {
            resetForm();
        }
    };

    return (
        <div className={style.post__comments}>
            <ul className={style.commentsList}>
                {comments && comments.map(comment => (
                    <CustomComment
                        key={comment.id}
                        comment={comment}
                        userId={userId}
                        deleteComment={deleteComment}
                        postId={postId}
                        startEditing={startEditing}
                        replyComment={replyComment}
                    />
                ))}
            </ul>
            <CommentsForm
                avatar={avatar}
                onSubmit={onSubmit}
                initialValues={editingComment ? {comment: editingComment?.content} : initialFormValue}
                editMode={!!editingComment}
                disableInputFocus={disableInputFocus}
                cancelEditing={resetForm}
                isInputFocus={isInputFocus}
                form={FORM_NAME}
            />
        </div>
    )
};

export default Comments;
