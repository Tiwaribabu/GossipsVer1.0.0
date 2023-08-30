import firebase from 'firebase';

export const firebaseConfig = {
    apiKey: "AIzaSyAcaq2X6m0P9zp0ahKgK4qUDkn3DguyC-0",
  authDomain: "gossips-27e53.firebaseapp.com",
  projectId: "gossips-27e53",
  storageBucket: "gossips-27e53.appspot.com",
  messagingSenderId: "497988915785",
  appId: "1:497988915785:web:2cbe31491373bdb8442598"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);
export default firebase.firestore();
