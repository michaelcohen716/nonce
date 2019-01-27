import * as React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Button from '../common/Button'
import metrics from '../../config/metrics'
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements'
import { signupUser } from '../../store/auth'

interface LoginState {
  email: string
  password: string
  showError: boolean
}

interface LoginProps {
  authenticating: boolean
}

interface LoginPropsFromDispatch {
  signupUser: typeof signupUser
}

type AllProps = LoginProps & LoginPropsFromDispatch

class Login extends React.Component<AllProps, LoginState> {
  state = {
    email: '',
    password: '',
    showError: false,
  }

  render() {
    const { container, content, login, auth } = styles
    const {
      state: { email, password, showError },
      props: { authenticating },
    } = this

    return (
      <View style={container}>
        <View style={content}>
          <Image
            source={require('../../assets/readme/provisional-logo.png')}
            style={{
              width: 250,
              resizeMode: 'cover',
            }}
          />
          <View style={auth}>
            <View style={login}>
              <FormLabel>Email</FormLabel>
              <FormInput
                value={email}
                onChangeText={email => this.setState({ email })}
              />
            </View>

            <View style={login}>
              <FormLabel>Password</FormLabel>
              <FormInput
                secureTextEntry={true}
                value={password}
                onChangeText={password => this.setState({ password })}
              />
              {showError && (
                <FormValidationMessage>
                  {'Bad email/pw combo'}
                </FormValidationMessage>
              )}
            </View>
            <Button label="Login" onPress={() => this.props.signupUser()} />
          </View>
        </View>
      </View>
    )
  }
}

export default Login

const styles = StyleSheet.create({
  container: {
    width: metrics.DEVICE_WIDTH,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    height: metrics.DEVICE_HEIGHT * 0.5,
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  auth: {
    justifyContent: 'center',
    height: metrics.DEVICE_HEIGHT * 0.5,
  },
  login: {
    height: '20%',
    width: metrics.DEVICE_WIDTH * 0.75,
  },
})
