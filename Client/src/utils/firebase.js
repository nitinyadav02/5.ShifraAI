import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "shifraai-62196.firebaseapp.com",
  projectId: "shifraai-62196",
  storageBucket: "shifraai-62196.firebasestorage.app",
  messagingSenderId: "49575924150",
  appId: "1:49575924150:web:bde1842e68db3035647117"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider()

export {auth , provider}