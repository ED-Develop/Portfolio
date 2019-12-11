import React from 'react';
import {addMessage, getDialogs, getMessages, sendMessage} from "../../Redux/dialogReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {toggleIsSuccess} from "../../Redux/appReducer";
import {Redirect, withRouter} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";

class DialogsContainer extends React.Component {
    componentDidMount() {
        this.props.toggleIsSuccess(false);
        this.props.getDialogs();
        if (this.props.match.params.userId) {
            this.props.getMessages(this.props.match.params.userId);
        }
    }

    render() {
        const {toggleIsSuccess, ...props} = this.props;
        if (!this.props.match.params.userId && this.props.dialogs.length) {
            return <Redirect to={`/messages/${this.props.dialogs[0].id}`}/>
        }
        if (this.props.isFetching) return <Preloader/>;
        return (
                <Dialogs {...props}/>

        )
    }
}

let mapStateToProps = (state) => {
    return {
        messages: state.dialogs.messages,
        dialogs: state.dialogs.dialogs,
        avatar: state.auth.photos.small,
        login: state.auth.login,
        userId: state.auth.userId,
        isFetching: state.app.isFetching
    };
};

export default compose(connect(mapStateToProps, {addMessage,getMessages, toggleIsSuccess, getDialogs}),
    withAuthRedirect, withRouter)(DialogsContainer);