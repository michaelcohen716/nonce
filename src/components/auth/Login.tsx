import * as React from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  ActivityIndicator,
  TextInput,
} from 'react-native'
import Button from '../common/Button'
import metrics from '../../config/metrics'
import firebase from 'firebase'
import { LoginPropsFromDispatch } from './LoginContainer'
import { Actions } from 'react-native-router-flux'

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

type AllProps = LoginProps & LoginPropsFromDispatch

class Login extends React.Component<AllProps, LoginState> {
  state = {
    email: '',
    password: '',
    showError: false,
    userType: null,
  }

  render() {
    const { container, content, login, auth, button } = styles
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
              <TextInput
                value={email}
                placeholder="Email"
                onBlur={() => this.checkEmailType()}
                onChangeText={email => this.setState({ email })}
              />
            </View>

            <View style={login}>
              <TextInput
                placeholder="Password"
                secureTextEntry={true}
                value={password}
                onChangeText={password =>
                  this.setState({ password, showError: false })
                }
              />
              {showError && <Text>Error</Text>}
            </View>
            <View style={button}>
              {authenticating ? (
                <ActivityIndicator size="small" color="#00ff00" />
              ) : (
                <Button
                  label={userType ? String(userType) : ''}
                  onPress={() => this.validateUser()}
                  disabled={!userType || password.length === 0}
                />
              )}
            </View>
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

  private validateUser = () => {
    if (this.state.userType === UserTypes.SIGNUP) {
      this.signupUser()
    } else {
      this.loginUser()
    }
  }

  private loginUser = () => {
    const { email, password } = this.state
    this.props.loginUser()
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => this.loginUserSuccess())
      .catch(() => this.loginUserFailure())
  }

  private loginUserSuccess = () => {
    this.props.loginUserSuccess(this.state.email)
    Actions.home()
  }

  private loginUserFailure = () => {
    this.props.loginUserFailure()
    this.setState({ password: '', showError: true })
  }

  private signupUser = () => {
    const { email, password } = this.state
    this.props.signupUser()
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => this.signupUserSuccess())
      .catch(error => console.log(error))
  }

  private signupUserSuccess = () => {
    this.props.signupUserSuccess(this.state.email)
    Actions.home()
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
    padding: 5,
  },
  auth: {
    justifyContent: 'center',
    height: metrics.DEVICE_HEIGHT * 0.5,
  },
  login: {
    height: '20%',
    width: metrics.DEVICE_WIDTH * 0.75,
  },
  button: {
    marginTop: 20,
    height: 20,
  },
})
