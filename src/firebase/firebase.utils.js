import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCNXVoN_HsSJevKFWkBRo6pZc9oI9f1H4c",
  authDomain: "crwn-db-f419b.firebaseapp.com",
  databaseURL: "https://crwn-db-f419b.firebaseio.com",
  projectId: "crwn-db-f419b",
  storageBucket: "crwn-db-f419b.appspot.com",
  messagingSenderId: "132642918124",
  appId: "1:132642918124:web:d61f1317e13623308d9fc9",
  measurementId: "G-8HSMMWHF4G",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try{
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    }catch (error){
      console.log('error creating user', error.message)
    }
  }
  return userRef;
};

firebase.initializeApp(config);
export const auth = firebase.auth();
export const firestore = firebase.firestore();
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);
export default firebase;
