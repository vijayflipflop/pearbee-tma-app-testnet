
import { initializeApp } from "firebase/app";
import { getAuth, } from "firebase/auth";
import {getFirestore} from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyBYfVx3YbdZ2XAkrZu9OZXtT1QBHFySz20",
//   authDomain: "pearbee-31a73.firebaseapp.com",
//   projectId: "pearbee-31a73",
//   storageBucket: "pearbee-31a73.appspot.com",
//   messagingSenderId: "706313232000",
//   appId: "1:706313232000:web:4d35e8fc2d3ecba95d9065"
// };

const firebaseConfig = {
  apiKey: "AIzaSyBjqsopwXCZ4ehT2GKFltV2C0ME4bsDX_Q",
  authDomain: "pearbee-fa699.firebaseapp.com",
  projectId: "pearbee-fa699",
  storageBucket: "pearbee-fa699.appspot.com",
  messagingSenderId: "600438771810",
  appId: "1:600438771810:web:5766eef6123bd567ea813b",
  measurementId: "G-F0TLL80V8B"
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const db = getFirestore(app);