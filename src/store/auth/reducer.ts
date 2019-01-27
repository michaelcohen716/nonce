import { Reducer } from 'redux'
import { AuthState, AuthActions } from './types'

const INITIAL_STATE: AuthState = {
  email: '',
  password: '',
  authenticating: false,
}

const reducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActions.EMAIL_CHANGED: {
      return { ...state, email: action.email }
    }

    case AuthActions.PASSWORD_CHANGED: {
      return { ...state, password: action.password }
    }

    case AuthActions.SIGNUP_USER: {
      return { ...state, authenticating: true }
    }

    default: {
      return state
    }
  }
}

export { reducer as authReducer }
