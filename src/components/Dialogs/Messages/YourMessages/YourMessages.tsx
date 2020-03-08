import React, {FC} from 'react';
import style from './YourMessages.module.css'

type PropsType = {
    message: any
}

const YourMessages: FC<PropsType> = ({message}) => {
  return(
      <div className={style.message}>
          <img className={style.avatar} src="https://img.novosti-n.org/upload/ukraine/131388.jpg" alt="avatar"/>
          <div className={style.content}>
             <div className={style.info}>
                 <span className={style.name}>{message.name}</span>
                 <span className={style.date}>{message.date}</span>
             </div>
              <p>{message.message}</p>
          </div>
      </div>
  );
};
export default YourMessages;