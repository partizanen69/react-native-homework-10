import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  getReactNativePersistence,
  initializeAuth,
} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "",
  authDomain: "react-native-neoversity-1aa6d.firebaseapp.com",
  projectId: "react-native-neoversity-1aa6d",
  storageBucket: "react-native-neoversity-1aa6d.firebasestorage.app",
  messagingSenderId: "435873237300",
  appId: "1:435873237300:web:6c851a08f1944a8f747d61",
  databaseURL: "<https://react-native-neoversity-1aa6d.firebaseio.com>",
};

const app = initializeApp(firebaseConfig);

// export const auth = getAuth(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
