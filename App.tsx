import * as React from 'react'
import { Provider } from 'react-redux'
import { rootReducer } from './src/store'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'
import Router from './src/Router'
import firebase from 'firebase'

export default class App extends React.Component<{}> {
  componentWillMount() {
    const config = {
      apiKey: process.env.FIREBASE_API_KEY,
      authDomain: `${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com`,
      databaseURL: `https://${process.env.FIREBASE_PROJECT_ID}firebaseio.com`,
      projectId: `${process.env.FIREBASE_PROJECT_ID}`,
      storageBucket: `${process.env.FIREBASE_PROJECT_ID}.appspot.com`,
      messagingSenderId: `${process.env.FIREBASE_SENDER_ID}`,
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
