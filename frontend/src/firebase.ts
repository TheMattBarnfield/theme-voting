import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/functions';

const firebaseConfig = {
    apiKey: "AIzaSyBHBelVcE4_OQy7EQpfx8nRkU45jvc5rI8",
    authDomain: "theme-voting.firebaseapp.com",
    databaseURL: "https://theme-voting.firebaseio.com",
    projectId: "theme-voting",
    storageBucket: "theme-voting.appspot.com",
    messagingSenderId: "859769997778",
    appId: "1:859769997778:web:782730ec0a42890d37600b"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const functions = firebase.functions();
