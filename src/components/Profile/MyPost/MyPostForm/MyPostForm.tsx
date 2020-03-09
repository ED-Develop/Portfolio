import React, {FC} from 'react';
import {Field, reduxForm, InjectedFormProps} from "redux-form";
import {Textarea} from "../../../common/FormsControls/FormsControls";
import {maxLength} from "../../../../utils/validators";

let maxLength50 = maxLength(50);

type FormData = {
    post: string
}

const MyPostForm: FC<any & InjectedFormProps<{}, any>> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field customClassName={'top'} component={Textarea} validate={[maxLength50]} name={'post'}
                   placeholder='Write what you wish'/>
            <button>Publish</button>
        </form>
    );
};
export default reduxForm<FormData, {}>({form: 'myPost'})(MyPostForm);