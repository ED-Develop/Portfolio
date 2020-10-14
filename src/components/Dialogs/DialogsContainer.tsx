import React, {ComponentType} from 'react';
import {dialogsActions, getDialogs, getMessages} from "../../redux/dialogs/dialog-reducer";
import Dialogs from "./Dialogs";
import {connect} from "react-redux";
import withAuthRedirect from "../../hoc/withAuthRedirect";
import {compose} from "redux";
import {appActions} from "../../redux/app/app-reducer";
import {Redirect, withRouter, RouteComponentProps} from "react-router-dom";
import Preloader from "../common/preloader/Preloader";
import {AppStateType} from "../../redux/store";

const {addMessage} = dialogsActions;
const {toggleIsSuccess} = appActions;

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

        if (this.props.isFetching) return null;

        return (
            <Dialogs
                userId={userId}
                login={login}
                avatar={avatar}
                addMessage={addMessage}
                dialogs={dialogs}
                messages={messages}
            />

        )
    }
}

let mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    messages: state.dialogs.messages,
    dialogs: state.dialogs.dialogs,
    avatar: state.auth.photos.small,
    login: state.auth.login,
    userId: state.auth.userId,
    isFetching: state.app.isFetching
});

export default compose<ComponentType>(
    connect<MapStateToPropsType, MapDispatchPropsType, {}, AppStateType>(mapStateToProps, {
        addMessage,
        getMessages,
        toggleIsSuccess,
        getDialogs
    }),
    withAuthRedirect,
    withRouter
)(DialogsContainer);
