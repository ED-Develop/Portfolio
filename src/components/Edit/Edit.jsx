import React, {Component} from 'react';
import style from './Edit.module.css';
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsControls/FormsControls";
import {connect} from "react-redux";
import {getUserProfile, updateProfileData} from "../../Redux/profileReducer";
import {Redirect} from "react-router-dom";
import {required} from "../../utils/validators";
import {compose} from "redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import InputItem from "./InputItem/InputItem";
import Preloader from "../common/Preloader/Preloader";

class Edit extends Component {
    state = {
        show: ['main']
    };

    componentDidMount() {
        if (!this.props.profile) {
            this.props.getUserProfile(this.props.userId);
        }
    }

    onSubmit = (formData) => {
        console.log(formData);
        this.props.updateProfileData(formData);
    };

    showElement = (elementName) => {
        this.setState((prevState) => {
            if (prevState.show.some(item => item === elementName)) {
                if (prevState.show.length > 1) {
                    return {
                        show: prevState.show.filter(item => item !== elementName)
                    }
                } else return prevState;

            }
            return {
                show: [...prevState.show, elementName]
            }
        })
    };

    render() {
        let {isUpdateSuccess, profile} = this.props;

        if (isUpdateSuccess) {
            return <Redirect to='/profile/about'/>
        }
        if (!profile) return <Preloader/>;
        return (
            <div className={style.wrapper}>
                <EditReduxForm show={this.state.show} showElement={this.showElement} initialValues={profile}
                               onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

const EditForm = ({handleSubmit, ...props}) => {

    const main = (<div className={style.section}>
        <InputItem name='fullName' label='Login' customClassName='right' validate={[required]}/>
        <div className={style.inputBlock}>
            <label>About me: </label>
            <Field validate={[required]} name='aboutMe' customClassName={'right'} component={Textarea}/>
        </div>
        <div className={style.checkboxBlock}>
            <label><Field name='lookingForAJob' component='input' type='checkbox'/>
                Looking for a job</label>
        </div>
        <div className={style.inputBlock}>
            <label>My professional skills: </label>
            <Field validate={[required]} name='lookingForAJobDescription' customClassName={'right'}
                   component={Textarea}/>
        </div>
    </div>);

    const contacts = (<div className={style.section}>
        {Object.keys(props.initialValues.contacts).map(item => {
            return <InputItem key={item} name={`contacts.${item}`} label={item.slice(0, 1).toUpperCase() + item.slice(1)}
                              customClassName='right'/>
        })}
    </div>);

    return (
        <form onSubmit={handleSubmit} className={style.editForm}>
            <h2 className={props.show.some(item => item === 'main') ? style.active : style.disActive}>
                <span onClick={() => props.showElement('main')}>Main</span>
            </h2>
            {props.show.some(item => item === 'main') ? main : null}
            <h2 className={props.show.some(item => item === 'contacts') ? style.active : style.disActive}>
                <span onClick={() => props.showElement('contacts')}>Contacts</span>
            </h2>
            {props.show.some(item => item === 'contacts') ? contacts : null}
            <div className={style.btn}>
                <button>Save</button>
            </div>
        </form>
    )
};

const EditReduxForm = reduxForm({form: 'edit'})(EditForm);

const mapStateToProps = (state) => {
    return {
        isUpdateSuccess: state.profile.isUpdateSuccess,
        profile: state.profile.profile,
        userId: state.auth.userId
    }
};

export default compose(connect(mapStateToProps, {updateProfileData, getUserProfile}), withAuthRedirect)(Edit);