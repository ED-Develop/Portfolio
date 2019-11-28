import React from 'react';
import style from './MyMessages.module.css';
import defaultAvatar from '../../../../assets/images/user.png';

const MyMessages = (props) => {
  return(
      <div className={style.message}>
          <div className={style.content}>
             <div className={style.info}>
                 <span className={style.name}>{props.login}</span>
                 <span className={style.date}>{props.date}</span>
             </div>
              <p>{props.message}</p>
          </div>
          <img className={style.avatar} src={props.avatar || defaultAvatar} alt="avatar"/>
      </div>
  );
};
export default MyMessages;