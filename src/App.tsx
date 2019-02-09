import {
  FIREBASE_API_KEY,
  FIREBASE_PROJECT_ID,
  FIREBASE_SENDER_ID,
} from 'react-native-dotenv'
import * as React from 'react'
import { Provider } from 'react-redux'
import { rootReducer } from './store'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'
import Router from './Router'
import firebase from 'firebase'

export default class App extends React.Component<{}> {
  componentWillMount() {
    const config = {
      apiKey: FIREBASE_API_KEY,
      authDomain: `${FIREBASE_PROJECT_ID}.firebaseapp.com`,
      databaseURL: `https://${FIREBASE_PROJECT_ID}.firebaseio.com`,
      projectId: `${FIREBASE_PROJECT_ID}`,
      storageBucket: `${FIREBASE_PROJECT_ID}.appspot.com`,
      messagingSenderId: `${FIREBASE_SENDER_ID}`,
    }

    firebase.initializeApp(config)
  }

  render() {
    const store = createStore(
      rootReducer,
      {},
      applyMiddleware(ReduxThunk, logger)
    )

    return (
      <Provider store={store}>
        <Router />
      </Provider>
    )
  }
}
