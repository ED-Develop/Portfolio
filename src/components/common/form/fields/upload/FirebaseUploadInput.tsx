import React, {useEffect, useState} from 'react';
import {Button, Upload} from 'antd';
import {UploadOutlined} from '@ant-design/icons/lib';
import {RcFile, UploadChangeParam, UploadFile, UploadFileStatus} from 'antd/lib/upload/interface';
import StorageAPI from '../../../../../api/firebase/storage';
import {WrappedFieldInputProps, WrappedFieldMetaProps} from 'redux-form/lib/Field';
import {useDispatch} from 'react-redux';
import {change, hasSubmitSucceeded, registerField} from 'redux-form';
import {useSelector} from '../../../../../hook/useSelector';
import {localClient} from '../../../../../api/local-storage/local-storage';

type PropsType = WrappedFieldInputProps & WrappedFieldMetaProps & {
    storage: string
    multiple?: boolean
}

type TFile = UploadFile & {
    url: string
}

export const FirebaseUploadInput: React.FC<PropsType> = ({storage, form, name, multiple}) => {
    const localStorageKey = `${form}-submitSucceeded`;
    const dispatch = useDispatch();
    const [fileList, setFileList] = useState<Array<TFile> | TFile | null>(multiple ? [] : null);
    const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
    const [storageAPI] = useState(new StorageAPI(storage));
    const submitSucceeded = useSelector(hasSubmitSucceeded(form));

    useEffect(() => {
        if (submitSucceeded) localClient.set(localStorageKey, true);
    }, [submitSucceeded]);

    const handleUpload = async (file: RcFile) => {
        setFile('', 'uploading', {
            name: file.name,
            uid: file.uid,
            size: file.size,
            type: file.type,
            fileName: file.name
        });

        const url = await storageAPI.upload(file);

        setUploadedUrl(url);

        if (!multiple && !Array.isArray(fileList) && fileList) storageAPI.delete(fileList.url);
    }

    const setFile = (url: string, status: UploadFileStatus, file: UploadFile) => {
        setFileList(fileList => {
            const uploadedFile = {...file, url, status};

            return Array.isArray(fileList)
                ? [...fileList, uploadedFile]
                : uploadedFile;
        });
    }

    const handleChange = ({file}: UploadChangeParam) => {
        if (uploadedUrl) {
            setFile(uploadedUrl, 'success', file);
            setUploadedUrl(null);
        }
    }

    const handleRemove = (file: UploadFile) => {
        const url = Array.isArray(fileList)
            ? fileList.find(({name}) => name === file.name)?.url
            : fileList?.url;

        if (url) {
            setFileList(fileList => {
                return Array.isArray(fileList)
                    ? fileList.filter(({name}) => name !== file.name)
                    : null;
            });

            return storageAPI.delete(url)
        }

        return Promise.reject('No file url');
    }

    useEffect(() => {
        const value = Array.isArray(fileList) ? fileList.map(({url}) => url) : fileList?.url;

        dispatch(change(form, name, value));
    }, [fileList]);

    useEffect(() => {
        dispatch(registerField(form, name, multiple ? 'FieldArray' : 'Field'));

        return () => {
            if (!localClient.get(localStorageKey)) {
                storageAPI.cleanup();
            } else {
                localStorage.removeItem(localStorageKey);
            }
        }
    }, []);

    return (
        <Upload
            onRemove={handleRemove}
            onChange={handleChange}
            beforeUpload={handleUpload}
            fileList={Array.isArray(fileList) ? fileList : fileList ? [fileList] : []}
        >
            <Button>
                <UploadOutlined/>
                Click to Upload
            </Button>
        </Upload>
    )
};