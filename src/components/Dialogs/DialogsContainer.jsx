import React from 'react';
import {addMessage} from "../../Redux/dialogReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";

let mapStateToProps = (state) => {
    return {
        messagesData: state.dialogsPage.messagesData,
        dialogsData: state.dialogsPage.dialogsData,
        messageTextValue: state.dialogsPage.messageTextValue,
        avatar: state.auth.photos.small,
        userId: state.auth.userId
    };
};

export default compose(connect(mapStateToProps, {addMessage}),
    withAuthRedirect)(Dialogs);