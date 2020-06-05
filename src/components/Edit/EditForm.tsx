import React, {FC} from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {TProfileModel} from "../../types/types";
import style from "./Edit.module.css";
import InputItem from "./InputItem/InputItem";
import {required} from "../../utils/validators";
import {
    createField, CreateFieldOptionsType,
    GetObjectsKeys,
    CustomInput,
    Textarea
} from "../common/FormsControls/FormsControls";

type FormPropsType = {
    show: Array<string>
    initialValues: TProfileModel
    showElement: (elementName: string) => void
}
type EditFormDataKeysType = GetObjectsKeys<TProfileModel>;

const editFieldsData: Array<CreateFieldOptionsType<EditFormDataKeysType>> = [
    {name: 'fullName', label: 'Login:', validators: [required], component: CustomInput},
    {name: 'aboutMe', label: 'About me:', validators: [required], component: Textarea},
    {name: 'lookingForAJob', label: 'Looking for a job', component: 'input', type: 'checkbox', labelAppend: true},
    {name: 'lookingForAJobDescription', label: 'My professional skills:', validators: [required], component: Textarea}
];

const EditForm: FC<FormPropsType & InjectedFormProps<TProfileModel, FormPropsType>> = ({handleSubmit, ...props}) => {
    const mainForm = (
        <div className={style.section}>
            {editFieldsData.map(field => {
                return (
                    <div className={field.type === 'checkbox' ? style.checkboxBlock : style.inputBlock}>
                        {createField<EditFormDataKeysType>({
                            name: field.name,
                            component: field.component,
                            label: field.label,
                            labelAppend: field.labelAppend,
                            validators: field.validators,
                            type: field.type,
                            customClassName: 'right',
                        })}
                    </div>
                )
            })}
        </div>
    );

    const contactsForm = (<div className={style.section}>
        {
            Object.keys(props.initialValues.contacts).map(item => <InputItem
                key={item}
                name={`contacts.${item}`}
                label={item.slice(0, 1).toUpperCase() + item.slice(1)}
                customClassName='right'
            />)
        }
    </div>);

    return (
        <form onSubmit={handleSubmit} className={style.editForm}>
            <h2 className={props.show.some(item => item === 'main') ? style.active : style.disActive}>
                <span onClick={() => props.showElement('main')}>Main</span>
            </h2>
            {props.show.some(item => item === 'main') ? mainForm : null}
            <h2 className={props.show.some(item => item === 'contacts') ? style.active : style.disActive}>
                <span onClick={() => props.showElement('contacts')}>Contacts</span>
            </h2>
            {props.show.some(item => item === 'contacts') ? contactsForm : null}
            <div className={style.btn}>
                <button>Save</button>
            </div>
        </form>
    )
};

export default reduxForm<TProfileModel, FormPropsType>({form: 'edit'})(EditForm);
