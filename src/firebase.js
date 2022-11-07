import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
    apiKey: "AIzaSyACH7POg68ljcqaFdYUxuDgaSWHpSxrMp0",
    authDomain: "nwitter-71970.firebaseapp.com",
    projectId: "nwitter-71970",
    storageBucket: "nwitter-71970.appspot.com",
    messagingSenderId: "991692207736",
    appId: "1:991692207736:web:11a5c0192d6f48d5c35f8d"
};

firebase.initializeApp(firebaseConfig) ;
export const firebaseInstance = firebase ; 
export const authService = firebase.auth() ; 
export const dbService = firebase.firestore() ; 
export const storageService = firebase.storage();
 