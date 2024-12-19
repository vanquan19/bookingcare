// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDduxLnVKBR2mVLqIe0HJYHOdAKmeUgN4w",
    authDomain: "otpphonebokingcare.firebaseapp.com",
    projectId: "otpphonebokingcare",
    storageBucket: "otpphonebokingcare.firebasestorage.app",
    messagingSenderId: "943036797327",
    appId: "1:943036797327:web:69074e0fe6418d740ffbfa",
    measurementId: "G-WRW1M8P43T"
  };

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();
export { auth };
