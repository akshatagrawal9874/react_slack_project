import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
//delete the firebase.ps1 file for removing the error
const firebaseConfig =
{
  apiKey: "AIzaSyA9kJCKjx-Fq2s--RAsz-xY6wI-H-EkDIo",
  authDomain: "react-slack-clone-b87ba.firebaseapp.com",
  databaseURL: "https://react-slack-clone-b87ba.firebaseio.com",
  projectId: "react-slack-clone-b87ba",
  storageBucket: "react-slack-clone-b87ba.appspot.com",
  messagingSenderId: "575789726794",
  appId: "1:575789726794:web:675132079a324dc1593ab3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Auth stuff
export const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(googleProvider);
};

export const signOut = () => {
  auth.signOut();
};

// Firestore stuff
export const firestore = firebase.firestore();
window.firestore = firestore;

export const createOrGetUserProfileDocument = async (user, additionalData) => {
  if (!user) return;

  // check if a the user doc is there in DB with
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  // if no user exists in DB @ path 'userRef' then go and make one
  if (!snapshot.exists) {
    const { displayName, email, photoURL } = user;

    const createdAt = new Date();

    try {
      await userRef.set({
        display_name: displayName || additionalData.displayName,
        email,
        photo_url: photoURL
          ? photoURL
          : 'https://ca.slack-edge.com/T0188513NTW-U01867WD8GK-ga631e27835b-72',
        created_at: createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.error('Error creating user', error.message);
    }
  }
  return getUserDocument(user.uid);
};

export const getUserDocument = async (uid) => {
  if (!uid) return null;

  try {
    const userDocument = await firestore.collection('users').doc(uid);
    return userDocument;
  } catch (error) {
    console.error('Error fetching user', error.message);
  }
};
