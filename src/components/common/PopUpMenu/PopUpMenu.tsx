import React from "react";
import style from './PopUpMenu.module.css';
import {Popover} from "antd";
import {MoreOutlined} from "@ant-design/icons/lib";
import {TooltipPlacement} from "antd/lib/tooltip";

type PropsType = {
    className?: string
    placement?: TooltipPlacement
}

const PopUpMenu: React.FC<PropsType> = ({children, className, placement}) => {
    return (
        <Popover content={<ul className={style.popUpMenu}>{children}</ul>} placement={placement}>
            <MoreOutlined rotate={90} className={`${style.popUpBtn} ${className}`}/>
        </Popover>
    )
};

export default PopUpMenu;
