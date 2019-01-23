import * as React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Button from '../common/Button'
import metrics from '../../config/metrics'

export default class Login extends React.Component<{}> {
  render() {
    return (
      <View style={styles.container}>
        <Button label="Login" onPress={() => console.log('login')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH * 0.5,
  },
})
