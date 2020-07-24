import React from "react";
import {Button, Modal, Upload} from "antd";
import {LoadingOutlined, UploadOutlined} from "@ant-design/icons/lib";
import {RcCustomRequestOptions} from "antd/lib/upload/interface";

type PropsType = {
    isUpload: boolean
    entity?: string
    handleOk: () => void
    handleCancel: () => void
    uploadPhoto: (photo: File) => void
}

const UploadModal: React.FC<PropsType> = ({isUpload, handleCancel, handleOk, uploadPhoto, entity, children}) => {
    const handleChange = (options: RcCustomRequestOptions) => uploadPhoto(options.file);

    return (
        <Modal
            title={`Upload new ${entity || ''}`}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={false}
            visible
            centered
        >
            {children}
            <Upload
                showUploadList={false}
                customRequest={handleChange}
            >
                <Button>
                    {isUpload ? <LoadingOutlined/> : <UploadOutlined/>}
                    Click to Upload
                </Button>
            </Upload>
        </Modal>
    )
};

export default UploadModal;