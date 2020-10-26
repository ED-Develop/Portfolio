import React from "react";
import style from "./ErrorAlert.module.scss";
import {Alert} from "antd";

type PropsType = {
    message?: string
}

const ErrorAlert: React.FC<PropsType> = ({message}) => {
    return (
        <div className={style.errorAlert}>
            <Alert
                message='Some error occurred'
                description={message}
                type='error'
                closable
                showIcon
                className={style.errorAlert__window}
            />
        </div>
    )
};

export default ErrorAlert;