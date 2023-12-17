// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRFo8pW8RqVneNl30X5teHpFSXR8KqL9A",
  authDomain: "netflix-gpt-848f4.firebaseapp.com",
  projectId: "netflix-gpt-848f4",
  storageBucket: "netflix-gpt-848f4.appspot.com",
  messagingSenderId: "396129246410",
  appId: "1:396129246410:web:2f98e72be73d22ef5fa833",
  measurementId: "G-FJ371TF3S3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();