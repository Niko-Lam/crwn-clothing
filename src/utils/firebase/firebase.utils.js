// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'

import {
  getAuth,
  // signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth'

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBJYyKa-PqLrzJUyreT8aHPEsXXivSeQ8U',
  authDomain: 'crwn-clothing-db-892bb.firebaseapp.com',
  projectId: 'crwn-clothing-db-892bb',
  storageBucket: 'crwn-clothing-db-892bb.appspot.com',
  messagingSenderId: '822602778899',
  appId: '1:822602778899:web:c97d04ec3701d8f63072e6',
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: 'select_account',
})

export const auth = getAuth()

export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInFormation = {}
) => {
  if (!userAuth) return
  const userDocRef = doc(db, 'users', userAuth.uid)
  const userShapshot = await getDoc(userDocRef)

  //如果用户信息不存在
  if (!userShapshot.exists()) {
    const { displayName, email } = userAuth
    const createAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createAt,
        ...additionalInFormation,
      })
    } catch (err) {
      console.log('error create the user', err.message)
    }
  }

  //如果用户信息存在

  //返回userDocRef
  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, passwoed) => {
  if (!email || !passwoed) return

  return await createUserWithEmailAndPassword(auth, email, passwoed)
}
