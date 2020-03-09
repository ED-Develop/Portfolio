import React from 'react';
import {addMessage, getDialogs, getMessages} from "../../Redux/dialogReducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {toggleIsSuccess} from "../../Redux/appReducer";
import {Redirect, withRouter, RouteComponentProps} from "react-router-dom";
import Preloader from "../common/Preloader/Preloader";
import {AppStateType} from "../../Redux/reduxStore";

type MapStateToPropsType = {
    messages: Array<any>
    dialogs: Array<any>
    avatar: string | null
    login: string | null
    userId: number | null
    isFetching: boolean
}

type MapDispatchPropsType = {
    addMessage: (messageText: string, userId: number, login: string) => void
    getMessages: (userId: number) => void
    toggleIsSuccess: (isSuccess: boolean) => void
    getDialogs: () => void
}

type ParamsType = {
    userId?: string
}

type PropsType = MapStateToPropsType & MapDispatchPropsType & RouteComponentProps<ParamsType>;

class DialogsContainer extends React.Component<PropsType> {
    componentDidMount() {
        this.props.toggleIsSuccess(false);
        this.props.getDialogs();

        if (this.props.match.params.userId) {
            this.props.getMessages(+this.props.match.params.userId);
        }
    }

    render() {
        const {userId, login, avatar, addMessage, dialogs, messages} = this.props;

        if (!this.props.match.params.userId && this.props.dialogs.length) {
            return <Redirect to={`/messages/${this.props.dialogs[0].id}`}/>
        }

        if (this.props.isFetching) return <Preloader/>;
        return (
            <Dialogs userId={userId} login={login} avatar={avatar} addMessage={addMessage}
                     dialogs={dialogs} messages={messages}/>

        )
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        messages: state.dialogs.messages,
        dialogs: state.dialogs.dialogs,
        avatar: state.auth.photos.small,
        login: state.auth.login,
        userId: state.auth.userId,
        isFetching: state.app.isFetching
    };
};

export default compose(connect<MapStateToPropsType, MapDispatchPropsType, unknown, AppStateType>(mapStateToProps,
    {addMessage, getMessages, toggleIsSuccess, getDialogs}),
    withAuthRedirect, withRouter)(DialogsContainer);