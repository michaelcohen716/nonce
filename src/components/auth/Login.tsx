import * as React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import Button from '../common/Button'
import metrics from '../../config/metrics'
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements'
import firebase from 'firebase'
import { signupUser } from '../../store/auth'
import { createUser } from '../../firebase/auth'

enum UserTypes {
  LOGIN = 'LOGIN',
  SIGNUP = 'SIGNUP',
}

interface LoginState {
  email: string
  password: string
  showError: boolean
  userType: UserTypes | null
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
    userType: null,
  }

  render() {
    const { container, content, login, auth } = styles
    const {
      state: { email, password, showError, userType },
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
                onBlur={() => this.checkEmailType()}
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
            <Button
              label={userType ? String(userType) : ''}
              onPress={() => this.signupUser()}
            />
          </View>
        </View>
      </View>
    )
  }

  private checkEmailType = () => {
    firebase
      .auth()
      .fetchSignInMethodsForEmail(this.state.email)
      .then(retVal => {
        if (retVal.length) {
          this.setState({ userType: UserTypes.LOGIN })
        } else {
          this.setState({ userType: UserTypes.SIGNUP })
        }
      })
  }

  private signupUser = () => {
    const { email, password } = this.state
    this.props.signupUser()
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => console.log(user))
      .catch(error => console.log(error))
    // createUser(email, password).then(user => {

    // })
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
