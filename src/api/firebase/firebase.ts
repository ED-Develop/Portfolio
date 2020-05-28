import firebase from "firebase";
import axios from "axios";
import {BaseAPI} from "../base-api";

const firebaseConfig = {
    apiKey: "AIzaSyBxo0wX9tg2u4RWr6AMJL4p-_r5nC9XLdw",
    authDomain: "social-network-6361c.firebaseapp.com",
    databaseURL: "https://social-network-6361c.firebaseio.com",
    projectId: "social-network-6361c",
    storageBucket: "social-network-6361c.appspot.com",
    messagingSenderId: "123793187557",
    appId: "1:123793187557:web:e30085e97bfbff12b86a0c"
};

firebase.initializeApp(firebaseConfig);

const instance = axios.create({
    baseURL: 'https://social-network-6361c.firebaseio.com/',
    headers: {
        'Content-Type': 'application/json'
    }
});

export class FirebaseAPI extends BaseAPI{
    constructor(endpoint: string) {
        super(endpoint, instance, '.json');
    }
}
