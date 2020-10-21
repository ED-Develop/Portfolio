import React from 'react';
import {
    FieldPropsType, ReduxFormAddInput,
    ReduxFormCheckbox,
    ReduxFormFirebaseUpload,
    ReduxFormInput,
    ReduxFormTextarea
} from './redux-form-fields/ReduxFormFields';

export type TField<V> = Omit<FieldPropsType, 'name'> & {
    name: Extract<keyof V, string>
}

export function fieldsManager<V>({type, ...props}: TField<V>) {
    switch (type) {
        case 'text':
        case 'password':
            return <ReduxFormInput {...props} type={type} key={props.name as string}/>;
        case 'checkbox':
            return <ReduxFormCheckbox {...props} type={type} key={props.name as string}/>
        case 'textarea':
            return <ReduxFormTextarea {...props} key={props.name as string}/>
        case 'file':
            return <ReduxFormFirebaseUpload {...props} type={type} key={props.name as string}/>
        case 'add':
            return <ReduxFormAddInput {...props} key={props.name as string}/>
        default:
            return <ReduxFormInput {...props} key={props.name as string}/>;
    }
}