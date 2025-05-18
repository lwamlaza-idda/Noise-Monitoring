// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBfH5O843mwt4MMmfbmxGyAf1Bvx-Piaxg",
  authDomain: "noisemonitoring-22987.firebaseapp.com",
  databaseURL: "https://noisemonitoring-22987-default-rtdb.firebaseio.com",
  projectId: "noisemonitoring-22987",
  storageBucket: "noisemonitoring-22987.firebasestorage.app",
  messagingSenderId: "789284491608",
  appId: "1:789284491608:web:69c12b8eaaeb7f53aa152d",
  measurementId: "G-7QSB4M1PRW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database }; 