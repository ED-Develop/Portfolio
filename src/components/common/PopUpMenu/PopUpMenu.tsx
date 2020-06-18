import React from "react";
import style from './PopUpMenu.module.css';
import {Popover} from "antd";
import {MoreOutlined} from "@ant-design/icons/lib";
import {TooltipPlacement} from "antd/lib/tooltip";

type PropsType = {
    className?: string
    placement?: TooltipPlacement
    buttons?: Array<React.ReactElement>
}

const PopUpMenu: React.FC<PropsType> = ({children, className, placement, buttons}) => {
    let content;

    if (buttons) {
        content = (
            <ul className={style.popUpMenu}>
                {buttons.map(button => <li className={style.itemBtn}>{button}</li>)}
            </ul>
        )
    } else {
        content = <ul className={style.popUpMenu}>{children}</ul>;
    }

    return (
        <Popover content={content} placement={placement}>
            <MoreOutlined rotate={90} className={`${style.popUpBtn} ${className}`}/>
        </Popover>
    )
};

export default PopUpMenu;
