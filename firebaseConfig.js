import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyACFqWwLACi-MfCsuZxtsEdQQHJ0SNMyio",
  authDomain: "nspl-app-19f4e.firebaseapp.com",
  projectId: "nspl-app-19f4e",
  storageBucket: "nspl-app-19f4e.appspot.com", 
  messagingSenderId: "193652677453",
  appId: "1:193652677453:android:1a3de2cb02bbc4778b3504",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth with persistence using AsyncStorage
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Initialize Firestore
const db = getFirestore(app);

export { auth, db };
