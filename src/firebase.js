import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAejWd0npADpzfXrlz2xkJ_mKWX-MVdyBQ",
  authDomain: "expense-app-811ee.firebaseapp.com",
  projectId: "expense-app-811ee",
  storageBucket: "expense-app-811ee.appspot.com",
  messagingSenderId: "856788121946",
  appId: "1:856788121946:web:f8f7c35707c59beeca1b63",
  measurementId: "G-LW4NGCQMFF"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app);
export const db = getFirestore(app);
const analytics = getAnalytics(app);