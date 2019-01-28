import * as React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

interface HomeProps {
  user: string
}

class Home extends React.Component<HomeProps, {}> {
  render() {
    return (
      <View>
        <Text>{this.props.user}</Text>
      </View>
    )
  }
}

export default Home
