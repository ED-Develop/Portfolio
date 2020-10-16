import React from "react";
import style from './UserInfo.module.css';
import {useOutsideClick} from "../../../hook/useOutsideClick";

type PropsType = {
    isDropdown: boolean
    closeDropdown: () => void
}

const Dropdown: React.FC<PropsType> = ({closeDropdown, isDropdown, children}) => {
    const ref = useOutsideClick<HTMLDivElement>(() => {
        if (isDropdown) {
            closeDropdown();
        }
    }, [isDropdown]);

    return (
        <div ref={ref} className={style.userInfo__dropdown}>
            {children}
        </div>
    )
}

export default Dropdown;