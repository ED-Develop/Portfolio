import React, {FC} from 'react';
import style from '../Profile.module.css';
import facebook from '../../../assets/images/facebook.png';
import website from '../../../assets/images/website.png';
import github from '../../../assets/images/github.png';
import instagram from '../../../assets/images/instagram.png';
import mainLink from '../../../assets/images/mainLink.png';
import twitter from '../../../assets/images/twitter.jpg';
import vk from '../../../assets/images/vk.png';
import youtube from '../../../assets/images/youtube.png';
import contact from '../../../assets/images/contact.png';
import {TContacts} from '../../../types/types';

type PropsType = {
    contacts: TContacts
}

const Contacts: FC<PropsType> = ({contacts}) => {
    const ContactElements = [];
    let img = null;

    for (let contact in contacts) {
        switch (contact) {
            case 'facebook':
                img = <img src={facebook}/>;
                break;
            case 'website':
                img = <img src={website}/>;
                break;
            case 'github':
                img = <img src={github}/>;
                break;
            case 'instagram':
                img = <img src={instagram}/>;
                break;
            case 'mainLink':
                img = <img src={mainLink}/>;
                break;
            case 'youtube':
                img = <img src={youtube}/>;
                break;
            case 'vk':
                img = <img src={vk}/>;
                break;
            case 'twitter':
                img = <img src={twitter}/>;
                break;
        }

        ContactElements.push(<a key={contact} href={contact}>{img}</a>)
    }
    return (
        <div className={style.contacts}>
            <h3><img src={contact} alt="C"/>Contacts</h3>
            <div className={style.contactsIcons}>
                {ContactElements}
            </div>
        </div>
    )
};

export default Contacts;
