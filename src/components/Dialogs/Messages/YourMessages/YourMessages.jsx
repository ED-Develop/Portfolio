import React from 'react';
import style from './YourMessages.module.css'

const YourMessages = (props) => {
  return(
      <div className={style.message}>
          <img className={style.avatar} src="https://img.novosti-n.org/upload/ukraine/131388.jpg" alt="avatar"/>
          <div className={style.content}>
             <div className={style.info}>
                 <span className={style.name}>{props.name}</span>
                 <span className={style.date}>{props.date}</span>
             </div>
              <p>{props.message}</p>
          </div>
      </div>
  );
};
export default YourMessages;