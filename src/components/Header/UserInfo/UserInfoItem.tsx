import React, {useState} from "react";
import style from "./UserInfo.module.css";
import Dropdown from "./Dropdown";
import Fade from "../../common/animations/Fade";

type TContent = {
    Component: React.FC<any>
    props: object
}

type PropsType = {
    icon: string
    isAvatar?: boolean
    content?: TContent
}

const UserInfoItem: React.FC<PropsType> = ({icon, isAvatar, content}) => {
    const [isDropdown, setIsDropdown] = useState(false);
    const Content = content?.Component;

    const handleClick = () => setIsDropdown(true);
    const closeDropdown = () => setIsDropdown(false);

    return (
        <div onClick={handleClick}>
            <div className={`${style.userInfoItem} ${isAvatar && style.userAvatar}`}>
                <img className={style.userInfoImage} src={icon} alt="icon"/>
            </div>
            {content && (
                <Fade inProp={isDropdown} duration={200}>
                    <Dropdown closeDropdown={closeDropdown} isDropdown={isDropdown}>
                        {Content && <Content {...content.props} closeDropdown={closeDropdown}/>}
                    </Dropdown>
                </Fade>
            )}
        </div>
    )
};

export default UserInfoItem;
