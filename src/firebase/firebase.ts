import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import {
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_SENDER_ID,
} from 'react-native-dotenv'

const config = {
  apiKey: FIREBASE_API_KEY,
  authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
  databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
  projectId: `${FIREBASE_PROJECT_ID}`,
  storageBucket: `${FIREBASE_PROJECT_ID}.appspot.com`,
  messagingSenderId: `${FIREBASE_SENDER_ID}`,
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const db = firebase.database()
