import React from "react";
import style from "./Post.module.css";
import {TPostStatistic} from "../../../../types/types";
import {HeartOutlined, LikeOutlined, SaveOutlined, ShareAltOutlined} from "@ant-design/icons/lib";

type PropsType = {
    statistic: TPostStatistic
}

const Statistic: React.FC<PropsType> = ({statistic}) => {
    const icons = {
        liked: <LikeOutlined/>,
        comments: <HeartOutlined/>,
        shared: <ShareAltOutlined/>,
        saved: <SaveOutlined/>
    };

    return (
        <ul className={style.statistic}>
            {
                Object.keys(statistic).map((key: string, index: number) => {
                    const counter = statistic[key as keyof TPostStatistic];

                    return (
                        <li className={`${style.statisticItem} ${style[key]}`} key={index}>
                            <span className={style.statisticIcon}>{icons[key as keyof typeof icons]}</span>
                            <span className={style.statisticCount}>
                            {Array.isArray(counter) ? counter.length : counter}
                        </span>
                            {key}
                        </li>
                    )
                })
            }
        </ul>
    )
};

export default Statistic;
