import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCA8S6LAwsCltY4qkUhQ7TtKgQpyF8rju0",
  authDomain: "coach-finder-26a92.firebaseapp.com",
  projectId: "coach-finder-26a92",
  storageBucket: "coach-finder-26a92.firebasestorage.app",
  messagingSenderId: "697615943007",
  appId: "1:697615943007:web:8b3f1f274f81b272d862ea",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
