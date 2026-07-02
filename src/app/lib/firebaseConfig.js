// // lib/firebaseConfig.js
// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDoxGdQ0nC4K6wCp6jma3unAAY9-yfoPL4",
//   authDomain: "bonn-products.firebaseapp.com",
//   projectId: "bonn-products",
//   storageBucket: "bonn-products.firebasestorage.app",
//   messagingSenderId: "959615705471",
//   appId: "1:959615705471:web:2e1cc29af5ebc214113a4a",
//   measurementId: "G-E6S2LP8823"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// export const auth = getAuth(app);

// export { db };







// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBntDR17UwPLGmkO0ABE3CcbgpjwnjXANE",
  authDomain: "bonn-med.firebaseapp.com",
  projectId: "bonn-med",
  storageBucket: "bonn-med.firebasestorage.app",
  messagingSenderId: "759311634782",
  appId: "1:759311634782:web:29150ba12984d982c17fcf",
  measurementId: "G-4QG1G5FC99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
export const auth = getAuth(app);
export const db = getFirestore(app);