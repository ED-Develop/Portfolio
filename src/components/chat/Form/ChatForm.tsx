import React from 'react';
import style from './ChatForm.module.scss';
import AvatarImage from '../../common/helpers/AvatarImage';
import {useSelector} from '../../../hook/useSelector';
import {selectUserAvatar} from '../../../redux/auth/auth-selectors';
import {ReduxForm} from '../../common/form/ReduxForm';
import {FORM} from '../../../constants/forms';
import {fieldsManager, TField} from '../../common/form/fieldsManager';
import {Button} from 'antd';
import {SendOutlined} from '@ant-design/icons';

type TChatFormData = {
    message: string
}

export const ChatForm = () => {
    const url = useSelector(selectUserAvatar);

    const handleSubmit = (value: TChatFormData) => {
        console.log(value);
    };

    const formModel: Array<TField<TChatFormData>> = [
        {
            name: 'message',
            placeholder: 'Type your message...',
            type: 'textarea',
            wrapperClassName: style.chatForm__fieldWrapper,
            className: style.chatForm__textarea
        }
    ];

    return (
        <ReduxForm
            form={FORM.chat}
            onSubmit={handleSubmit}
        >
            {
                () => (
                    <div className={style.chatForm}>
                        <AvatarImage
                            type="large"
                            imgUrl={url}
                            className={style.chatForm__avatar}
                        />
                        <div className={style.chatForm__fields}>
                            {formModel.map(fieldsManager)}
                        </div>
                        <Button
                            type="primary"
                            shape="circle"
                            htmlType="submit"
                            icon={<SendOutlined/>}
                            className={style.chatForm__btn}
                        />
                    </div>
                )
            }
        </ReduxForm>
    );
};
