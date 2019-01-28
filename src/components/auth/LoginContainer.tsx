import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ApplicationState } from '../../store'
import {
  signupUser,
  signupUserSuccess,
  loginUser,
  loginUserSuccess,
  loginUserFailure,
} from '../../store/auth'
import Login from './Login'

const mapStateToProps = ({ auth }: ApplicationState) => ({
  authenticating: auth.authenticating,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signupUser: () => dispatch(signupUser()),
  signupUserSuccess: (email: string) => dispatch(signupUserSuccess(email)),
  loginUser: () => dispatch(loginUser()),
  loginUserSuccess: (email: string) => dispatch(loginUserSuccess(email)),
  loginUserFailure: () => dispatch(loginUserFailure()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

export interface LoginPropsFromDispatch {
  signupUser: typeof signupUser
  signupUserSuccess: typeof signupUserSuccess
  loginUser: typeof loginUser
  loginUserSuccess: typeof loginUserSuccess
  loginUserFailure: typeof loginUserFailure
}
