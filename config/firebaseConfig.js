import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyDuJby6rpVwjjvXiRKfZFUpNdaKGCmGPCs",
    authDomain: "teenmate-1a96e.firebaseapp.com",
    projectId: "teenmate-1a96e",
    storageBucket: "teenmate-1a96e.appspot.com",
    messagingSenderId: "282296382141",
    appId: "1:282296382141:web:57db7cd24685f8a7a63dd4"
};

export const app = initializeApp(firebaseConfig);
export const db= getFirestore(app);
export const storage = getStorage(app);
