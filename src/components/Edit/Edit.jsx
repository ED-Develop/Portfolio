import React from 'react';
import style from './Edit.module.css';
import {Field, reduxForm} from "redux-form";
import {Input, Textarea} from "../common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {updateProfileData} from "../../Redux/profileReducer";
import {Redirect} from "react-router-dom";
import {required} from "../../utils/validators";

const Edit = ({updateProfileData, isUpdateSuccess, profile}) => {

    const onSubmit = (formData) => {
        console.log(formData);
        updateProfileData(formData);
    };

    if (isUpdateSuccess) {
        return <Redirect to='/profile/about'/>
    }

    return (
        <div>
            <div className={style.wrapper}>
                <EditReduxForm initialValues={profile} onSubmit={onSubmit}/>
            </div>
        </div>
    )
};


const EditForm = ({handleSubmit}) => {
    return (
        <form onSubmit={handleSubmit} className={style.editForm}>
            <h2>Main</h2>
            <div className={style.section}>
                <div className={style.inputBlock}>
                    <label>Login: </label>
                    <Field validate={[required]} name='fullName' castomClassName={'right'} component={Input} type='text'/>
                </div>
                <div className={style.inputBlock}>
                    <label>About me: </label>
                    <Field validate={[required]} name='aboutMe' castomClassName={'right'} component={Textarea} />
                </div>
                <div className={style.checkboxBlock}>
                    <label><Field name='lookingForAJob' castomClassName={'right'} component='input' type='checkbox'/> Looking for a job</label>
                </div>
                <div className={style.inputBlock}>
                    <label>My professional skills: </label>
                    <Field validate={[required]} name='lookingForAJobDescription' castomClassName={'right'} component={Textarea} />
                </div>
            </div>
            <h2>Contacts</h2>
            <div className={style.section}>
                <div className={style.inputBlock}>
                    <label>Facebook: </label>
                    <Field name='contacts.facebook' castomClassName={'right'} component={Input} type='text'/>
                </div>
                <div className={style.inputBlock}>
                    <label>Vk: </label>
                    <Field name='contacts.vk' castomClassName={'right'} component={Input} type='text'/>
                </div>
                <div className={style.inputBlock}>
                    <label>Twitter: </label>
                    <Field name='contacts.twitter' castomClassName={'right'}  component={Input} type='text'/>
                </div>
                <div className={style.inputBlock}>
                    <label>Instagram: </label>
                    <Field name='contacts.instagram' castomClassName={'right'} component={Input} type='text'/>
                </div>
                <div className={style.inputBlock}>
                    <label>Youtube: </label>
                    <Field name='contacts.youtube' castomClassName={'right'} component={Input} type='text'/>
                </div>
                <div className={style.inputBlock}>
                    <label>Github: </label>
                    <Field name='contacts.github' castomClassName={'right'} component={Input} type='text'/>
                </div>
                <div className={style.inputBlock}>
                    <label>Website: </label>
                    <Field name='contacts.website' castomClassName={'right'} component={Input} type='text'/>
                </div>
                <div className={style.inputBlock}>
                    <label>Main Link: </label>
                    <Field name='contacts.mainLink' castomClassName={'right'} component={Input} type='text'/>
                </div>
            </div>
            <div className={style.btn}>
                <button>Save</button>
            </div>
        </form>
    )
};

const EditReduxForm = reduxForm({form: 'edit'})(EditForm);

const mapStateToProps = (state) => {
    return {
        isUpdateSuccess: state.profilePage.isUpdateSuccess,
        profile: state.profilePage.profile
    }
};

export default connect(mapStateToProps, {updateProfileData})(Edit);