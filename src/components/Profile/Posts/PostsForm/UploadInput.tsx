import React, {useEffect, useState} from "react";
import {Button, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons';
import {WrappedFieldProps} from "redux-form";
import {CustomFieldPropsType} from "../../../common/FormsControls/FormsControls";
import {RcCustomRequestOptions, UploadChangeParam, UploadFile} from "antd/lib/upload/interface";
import {TUploadedFile} from "../../../../types/types";
import {UploadStatus} from "../../../../redux/timeline/timeline-reducer";

export type UploadInputPropsType = {
    uploadFile: (file: File) => void
    uploadedFiles: Array<TUploadedFile>
    removeUploadedFile: (fileName: string) => void
    submitSucceeded: boolean
    cancelUploading: (formName: string, fieldName: string, urlFile?: string) => void
    toggleIsUploading: (isUploading: boolean) => void
    isUploading: boolean
    deleteFile: (fileUrl: string) => void
}

type TUploadSubscriber = {
    onSuccess: (response: object, file: File) => void
    onError: (error: Error) => void;
    file: File,
    fileUrl?: string | null
    status: UploadStatus
}

const UploadInput: React.FC<CustomFieldPropsType & WrappedFieldProps & UploadInputPropsType> = (props) => {
    const {uploadedFiles, uploadFile, removeUploadedFile, submitSucceeded, cancelUploading, toggleIsUploading} = props;
    const [uploadSubscribers, setSubscribes] = useState<Array<TUploadSubscriber>>([]);
    const [fileList, setFileList] = useState<Array<UploadFile>>([]);

    const setMetaDataToSubscribers = (uploadedFile: TUploadedFile) => {
        setSubscribes((subscribers) => {
            return subscribers.map(s => {
                if (uploadedFile.fileName === s.file.name) {
                    return {
                        ...s,
                        fileUrl: uploadedFile.status === UploadStatus.Success ? uploadedFile.fileUrl : null,
                        status: uploadedFile.status
                    }
                }

                return s;
            })
        })
    };

    // watch uploading process
    useEffect(() => {
        uploadSubscribers.forEach(subscriber => {
            const uploadedFile = uploadedFiles.find(file => file.fileName === subscriber.file.name);

            if (uploadedFile) {
                if (uploadedFile.status === UploadStatus.Success) {
                    subscriber.onSuccess({}, subscriber.file);
                } else if (uploadedFile.status === UploadStatus.Failed) {
                    subscriber.onError({name: subscriber.file.name, message: 'Upload failed'});
                }

                setMetaDataToSubscribers(uploadedFile);
                removeUploadedFile(subscriber.file.name);
            }
        });
    }, [uploadSubscribers, uploadedFiles]);

    // clean local state when submit succeeded
    useEffect(() => {
        if (submitSucceeded) {
            setFileList([]);
            setSubscribes([]);
        }
    }, [submitSucceeded]);

    // off disable submit button
    useEffect(() => {
        if (props.isUploading && uploadSubscribers.every(s => s.status !== UploadStatus.InProgress)) {
            toggleIsUploading(false);
        }
    }, [uploadSubscribers, props.isUploading]);

    // delete file from storage when component unmount
    useEffect(() => {
        return () => {
            cancelUploading(props.meta.form, props.input.name);
        }
    }, []);

    const handleUpload = ({file, onSuccess, onError}: RcCustomRequestOptions) => {
        uploadFile(file);
        setSubscribes([...uploadSubscribers, {onSuccess, file, onError, status: UploadStatus.InProgress}]);
        toggleIsUploading(true);
    };

    const handleChange = (info: UploadChangeParam) => setFileList([...info.fileList]);

    const handleRemove = (removingFile: UploadFile) => {
        const removingFileURl = uploadSubscribers.find(({file}) => file.name === removingFile.name)?.fileUrl;

        if (removingFileURl) {
            cancelUploading(props.meta.form, props.input.name, removingFileURl);
        }
    };

    return (
        <Upload
            multiple
            customRequest={handleUpload}
            fileList={fileList}
            onChange={handleChange}
            onRemove={handleRemove}
        >
            <Button>
                <UploadOutlined/> Upload
            </Button>
        </Upload>
    )
};

export default UploadInput;

