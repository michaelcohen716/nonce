// import firebase from 'firebase'
// const auth = firebase.auth()
import { auth } from './firebase'

export const createUser = (email: string, password: string) => {
  auth.createUserWithEmailAndPassword(email, password)
}
