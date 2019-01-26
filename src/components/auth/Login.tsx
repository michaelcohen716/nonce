import * as React from 'react'
import { connect } from 'react-redux'
import { AuthActions, emailChanged, passwordChanged } from '../../store/auth'
import { StyleSheet, Text, View, Image } from 'react-native'
import Button from '../common/Button'
import metrics from '../../config/metrics'
import LoginFormInput from './LoginFormInput'
import { ApplicationState, ConnectedReduxProps } from '../../store'
import { Dispatch } from 'redux'
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements'

// interface LoginProps {
//   email: string
//   password: string
// }

interface LoginState {
  email: string
  password: string
}

interface LoginPropsFromDispatch {
  emailChanged: typeof emailChanged
  passwordChanged: typeof passwordChanged
}

type AllProps = LoginPropsFromDispatch
// type AllProps = LoginProps & LoginPropsFromDispatch

class Login extends React.Component<AllProps, LoginState> {
  state = {
    email: '',
    password: '',
  }

  render() {
    const { container, content, login, auth } = styles
    const {
      props: { emailChanged, passwordChanged },
      state: { email, password },
    } = this
    console.log(this)

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
              <LoginFormInput
                label="Email"
                value={email}
                onChangeText={emailChanged}
              />
            </View>

            <View style={login}>
              <LoginFormInput
                label="Password"
                value={password}
                onChangeText={passwordChanged}
                secureTextEntry={true}
                validationErrorMessage="Incorrect password/email combination"
              />
            </View>
            <Button label="Login" onPress={() => console.log('login')} />
          </View>
        </View>
      </View>
    )
  }

  private onEmailChange = (email: string) => {
    this.setState({ email })
  }

  private onPasswordChange = (password: string) => {
    this.setState({ password })
  }
}

const mapStateToProps = ({ auth }: ApplicationState) => ({
  email: auth.email,
  password: auth.password,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  emailChanged: (email: string) => dispatch(emailChanged(email)),
  passwordChanged: (password: string) => dispatch(passwordChanged(password)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

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
