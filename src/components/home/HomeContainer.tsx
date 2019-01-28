import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { ApplicationState } from '../../store'
import { signupUser, signupUserSuccess } from '../../store/auth'
import Home from './Home'

const mapStateToProps = ({ auth }: ApplicationState) => ({
  user: auth.user,
})

export default connect(
  mapStateToProps,
  null
)(Home)
