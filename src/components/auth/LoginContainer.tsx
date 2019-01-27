import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ApplicationState } from '../../store'
import { signupUser } from '../../store/auth'
import Login from './Login'

const mapStateToProps = ({ auth }: ApplicationState) => ({
  authenticating: auth.authenticating,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  signupUser: () => dispatch(signupUser()),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
