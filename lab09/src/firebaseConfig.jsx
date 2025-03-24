import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Credenciales del proyecto de firebase.
const firebaseConfig = {
  apiKey: "AIzaSyCzvhxsKaUIjL8SU6ObHbwxmxBH4FvfAvI",
  authDomain: "lab09-b3727.firebaseapp.com",
  projectId: "lab09-b3727",
  storageBucket: "lab09-b3727.firebasestorage.app",
  messagingSenderId: "404726711801",
  appId: "1:404726711801:web:01dc9124b6ae8bdbffe928",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);
