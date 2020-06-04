import React from "react";
import style from "./EditingInfo.module.css"
import {Tooltip} from "antd";
import {
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    FileImageOutlined,
    VideoCameraOutlined
} from "@ant-design/icons/lib";

type PropsType = {
    handleCancelEditing: () => void
    textContent: string
    filesCount?: number
    className?: string
    videoLink?: string
    removeVideoLink?: () => void
}

const EditingInfo: React.FC<PropsType> = ({handleCancelEditing, textContent, className, filesCount, videoLink, ...props}) => {
    return (
        <div className={`${style.editField} ${className}`}>
            <Tooltip title='Cancel editing'>
                <CloseOutlined className={style.iconClose} onClick={handleCancelEditing}/>
            </Tooltip>
            <div className={style.editIcon}>
                <EditOutlined/>
            </div>
            <div>
                {filesCount && (
                    <div className={style.editField__files}>
                        <FileImageOutlined className={style.assetsIcon}/>
                        {filesCount} files
                    </div>
                )}
                {videoLink && (
                    <div className={style.editField__link}>
                        <VideoCameraOutlined className={style.assetsIcon}/>
                        <a href={videoLink}>{videoLink}</a>
                        <DeleteOutlined
                            onClick={props.removeVideoLink}
                            className={style.iconDelete}
                            title='Remove video'
                        />
                    </div>
                )}
                <p>{textContent}</p>
            </div>
        </div>
    )
};

export default EditingInfo;
