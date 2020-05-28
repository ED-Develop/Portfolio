import React, {useEffect, useState} from "react";
import {Button, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {WrappedFieldProps} from "redux-form";
import {CustomFieldPropsType} from "../../../common/FormsControls/FormsControls";
import {RcCustomRequestOptions, RcFile} from "antd/lib/upload/interface";

export type UploadInputPropsType = {
    uploadFile: (file: File) => void
}

type TUploadData = {
    onChange: (response: object, file: File) => void
    file: File
}

const UploadInput:React.FC<CustomFieldPropsType & WrappedFieldProps & UploadInputPropsType> = ({input, uploadFile}) => {
    const [uploadData, setUploadData] = useState<TUploadData | null >(null);

    useEffect(() => {
        setTimeout(() => uploadData?.onChange({}, uploadData?.file))
    }, [uploadData]);
    const handleUpload = async (options: RcCustomRequestOptions) => {
        uploadFile(options.file);

        // input.onChange(info.fileList.map(file => file.originFileObj));
        setTimeout(() => {
            options.onSuccess({}, options.file);
        }, 1000);
    };

    return (
        <Upload  multiple customRequest={handleUpload}>
            <Button>
                <UploadOutlined/> Upload
            </Button>
        </Upload>
    )
};

export default UploadInput;

