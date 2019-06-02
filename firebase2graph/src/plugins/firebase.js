import firebase from 'firebase/app'
import 'firebase/firebase-database'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBgKg-ffEYDrJlMhwS7ELNHhtsGpbDJ0E",
  authDomain: "p2pquake.firebaseapp.com",
  databaseURL: "https://p2pquake.firebaseio.com",
  projectId: "p2pquake",
  storageBucket: "p2pquake.appspot.com",
  messagingSenderId: "667662372160",
  appId: "1:667662372160:web:c3b60ed307817bd3"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Register global const
export const db = firebase.database()

