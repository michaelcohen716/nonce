import * as React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import storage, { storageSave } from '../../localStorage'

interface HomeProps {
  user: string
}

class Home extends React.Component<HomeProps, {}> {
  componentWillMount() {
    storageSave({ key: 'testkey', data: 'testvalue' })
  }

  render() {
    console.log(storage)
    return (
      <View>
        <Text>{this.props.user}</Text>
      </View>
    )
  }
}

export default Home
