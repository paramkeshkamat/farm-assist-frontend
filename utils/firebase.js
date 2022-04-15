/** @format */

import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDagA78nXNar8W7Mw9zwO1nD0DWnOo9gyw",
  authDomain: "farm-assist-5dd8c.firebaseapp.com",
  projectId: "farm-assist-5dd8c",
  storageBucket: "farm-assist-5dd8c.appspot.com",
  messagingSenderId: "847938093101",
  appId: "1:847938093101:web:5e72a03ddda18d99be38a4",
};

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();
const auth = firebase.auth();

export { storage, auth, firebase };
