// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-gAQEi5AcLMC-JSLIr3jH_fp39bogCX4",
  authDomain: "flashcards-2a870.firebaseapp.com",
  projectId: "flashcards-2a870",
  storageBucket: "flashcards-2a870.appspot.com",
  messagingSenderId: "330681229732",
  appId: "1:330681229732:web:77802ee5e897968839e131",
  measurementId: "G-VNHQ7V457X"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);