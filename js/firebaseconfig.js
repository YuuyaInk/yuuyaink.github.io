//Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABi96JV6I9YRiOK9YHAM6pHuacEAjm2X4",
  authDomain: "nilllog-c5b3c-fffb0.firebaseapp.com",
  databaseURL: "https://nilllog-c5b3c-default-rtdb.firebaseio.com",
  projectId: "nilllog-c5b3c",
  storageBucket: "nilllog-c5b3c.appspot.com",
  messagingSenderId: "467590623131",
  appId: "1:467590623131:web:fe35ae63396fa744ddfb3e",
  measurementId: "G-4FNMYBRW8E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
