// src/firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from 'firebase/app';
import { Auth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 
const firebaseConfig = {
  apiKey: "AIzaSyBA7ik5L827fE3BoGzJxC4qyYD9ruPWmtw",
  authDomain: "eclypse-daf7a.firebaseapp.com",
  projectId: "eclypse-daf7a",
  storageBucket: "eclypse-daf7a.appspot.com",
  messagingSenderId: "287721414765",
  appId: "1:287721414765:web:716b568b97af8795989f64",
  measurementId: "G-386E39FGZN"
};

// Initialize Firebase app
const app: FirebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and export
const auth: Auth = getAuth(app);
const db = getFirestore(app);  // <-- initialize Firestore

export { auth , db};
