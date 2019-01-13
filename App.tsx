import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import reducers from './src/reducers'
import { createStore, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import logger from 'redux-logger'

export default class App extends React.Component<{}> {
  render() {
    const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger))

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Text>Nonce</Text>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
