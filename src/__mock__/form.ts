import {TField} from '../components/common/form/fieldsManager';

export const formData: Array<TField<any>> = [
    {name: 'test1', type: 'text', placeholder: 'Your email'},
    {name: 'test2', placeholder: 'Your password', type: 'password'},
    {name: 'test3', type: 'checkbox', label: ' Remember me'}
];