import React, {FC} from 'react';
import {InjectedFormProps, reduxForm} from "redux-form";
import {createField, GetObjectsKeys, Textarea} from "../../../common/FormsControls/FormsControls";
import {maxLength} from "../../../../utils/validators";

const maxLength50 = maxLength(50);

export type PostFormData = {
    post: string
}

type PostFormDataKeysType = GetObjectsKeys<PostFormData>;

const MyPostForm: FC<any & InjectedFormProps<{}, any>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createField<PostFormDataKeysType>({
                component: Textarea,
                customClassName: 'top',
                validators: [maxLength50],
                name: 'post',
                placeholder: 'Write what you wish'
            })}
            <button>Publish</button>
        </form>
    );
};
export default reduxForm<PostFormData, {}>({form: 'myPost'})(MyPostForm);
