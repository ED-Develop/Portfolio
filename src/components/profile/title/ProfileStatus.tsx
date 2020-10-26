import React, {useState, useEffect, FC} from 'react';
import style from './ProfileTitle.module.css';
import {Input} from "antd";

type PropsType = {
    isMyProfile: boolean
    status: string
    updateProfileStatus: (status: string) => void
}

const ProfileStatus: FC<PropsType> = (props) => {
    const [editMode, setEditMode] = useState(false);
    const [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => setEditMode(true);

    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateProfileStatus(status);
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setStatus(e.target.value);

    return (
        <div className={style.profile__status}>
            {
                editMode
                    ? <Input
                        onChange={onInputChange}
                        value={status}
                        onBlur={deactivateEditMode}
                        autoFocus={true}
                        type="text"
                    />
                    : <p className={style.statusText}>
                        {props.status || (props.isMyProfile && 'Type this your status')}
                        {props.isMyProfile && <span onClick={activateEditMode} className={style.editBtn}>Edit</span>}
                    </p>
            }
        </div>
    );
};

export default ProfileStatus;
