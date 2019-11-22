import React from 'react';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../../../common/FormsControls/FormsControls";
import {maxLength} from "../../../../utils/validators";

let maxLength50 = maxLength(50);

const MyPostForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <Field castomClassName={'top'} component={Textarea} validate={[maxLength50]} name={'post'} placeholder='Write what you wish'/>
            <button>Publish</button>
        </form>
    );
};
export default reduxForm({form: 'myPost'})(MyPostForm);