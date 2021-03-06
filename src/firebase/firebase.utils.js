import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDEgLladDSpN-ciftUPkyASdvc8Hjsx2EI",
    authDomain: "crwn-clothing-react-4d940.firebaseapp.com",
    databaseURL: "https://crwn-clothing-react-4d940.firebaseio.com",
    projectId: "crwn-clothing-react-4d940",
    storageBucket: "crwn-clothing-react-4d940.appspot.com",
    messagingSenderId: "859416991281",
    appId: "1:859416991281:web:d008036b727e90cad32710"
};

firebase.initializeApp(config);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
