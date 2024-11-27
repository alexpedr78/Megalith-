import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: `${import.meta.env.FIREBASE_API_KEY}`,
  authDomain: "megalith-82e63.firebaseapp.com",
  projectId: "megalith-82e63",
  storageBucket: "megalith-82e63.appspot.com",
  messagingSenderId: "355110017480",
  appId: "1:355110017480:web:e408962323711cf127c8fd",
  measurementId: "G-5VJRCFC5P2",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
