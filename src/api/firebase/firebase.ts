import firebase from 'firebase';
import axios from 'axios';
import {BaseAPI} from '../base-api';
import {TObject} from '../../types/types';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_API,
    databaseURL: process.env.REACT_APP_FIREBASE_API_DATABASE,
    projectId: process.env.REACT_APP_FIREBASE_API_ID,
    storageBucket: process.env.REACT_APP_FIREBASE_API_STORAGE,
    messagingSenderId: process.env.REACT_APP_FIREBASE_API_MESSAGING_ID,
    appId: process.env.REACT_APP_FIREBASE_API_APP_ID
};

firebase.initializeApp(firebaseConfig);

const instance = axios.create({
    baseURL: process.env.REACT_APP_FIREBASE_API_DATABASE,
    headers: {
        'Content-Type': 'application/json'
    }
});

export class FirebaseAPI extends BaseAPI {
    constructor(endpoint: string) {
        super(endpoint, instance, '.json');
    }
}

export type TFirebaseGetResponse<R extends TObject> = {
    [key: string]: Omit<R, 'id'>
}

export type TFirebaseCreateResponse = {
    name: string
}
