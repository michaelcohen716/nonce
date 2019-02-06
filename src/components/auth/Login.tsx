import * as React from 'react'
import { StyleSheet, Text, View, Image, ActivityIndicator } from 'react-native'
import Button from '../common/Button'
import metrics from '../../config/metrics'
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements'
import firebase from 'firebase'
import { LoginPropsFromDispatch } from './LoginContainer'
import { Actions } from 'react-native-router-flux'
import storage, { storageSave } from '../../localStorage'
import { generateOrImportKeystore } from '../../keystore'

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
    const { container, content, login, auth, button, image } = styles
    const {
      state: { email, password, showError, userType },
      props: { authenticating },
    } = this

    return (
      <View style={container}>
        <View style={image}>
          <Image
            source={require('../../assets/readme/provisional-logo.png')}
            style={{
              width: 150,
              height: 150,
            }}
          />
        </View>
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
              onChangeText={password =>
                this.setState({ password, showError: false })
              }
            />
            {showError && (
              <FormValidationMessage>
                {'Bad email/pw combo'}
              </FormValidationMessage>
            )}
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

  private loginUserSuccess = async () => {
    this.props.loginUserSuccess(this.state.email)
    // const newKeystore = await generateOrImportKeystore({
    //   password: this.state.password,
    // })

    // await storageSave({
    //   key: 'keystore',
    //   data: newKeystore,
    // })
    // console.log(Object.getOwnPropertyNames(storage))
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
    justifyContent: 'center',
    height: metrics.DEVICE_HEIGHT,
  },
  image: {
    // height: '20%',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    padding: 5,
  },
  auth: {
    justifyContent: 'center',
    // height: '40%',
  },
  login: {
    // height: '25%',
    width: metrics.DEVICE_WIDTH * 0.75,
  },
  button: {
    marginTop: 20,
    height: 20,
  },
})
