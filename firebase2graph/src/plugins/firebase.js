import firebase from 'firebase/app'
import 'firebase/firebase-database'

// Your web app's Firebase configuration
const firebaseConfig = {
  databaseURL: "https://p2pquake.firebaseio.com",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Register global const
export const db = firebase.database()

