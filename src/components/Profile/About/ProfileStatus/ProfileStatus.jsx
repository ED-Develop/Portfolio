import React, {useState, useEffect} from 'react';
import style from './ProfileStatus.module.css';


const ProfileStatus = (props) => {

    let [editMode, setEditMode] = useState(false);
    let [status, setStatus] = useState(props.status);

    useEffect(() => {
        setStatus(props.status);
    }, [props.status]);

    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        props.updateProfileStatus(status);
    };
    const onInputChange = (e) => {
        setStatus(e.target.value);
    };

    return (
        <div className={style.status}>
            {editMode && props.isMyProfile ? <input onChange={onInputChange} value={status} onBlur={deactivateEditMode}
                                                    autoFocus={true} type="text"/>
                : <div className={props.isMyProfile && style.myProfile} onClick={activateEditMode}>
                    {props.status || (props.isMyProfile && 'Изменить статус')}
                </div>}
        </div>
    );
};

export default ProfileStatus;