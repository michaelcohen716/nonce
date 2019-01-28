import { Reducer } from 'redux'
import { AuthState, AuthActions } from './types'

const INITIAL_STATE: AuthState = {
  authenticating: false,
  user: '',
}

const reducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActions.SIGNUP_USER: {
      return { ...state, authenticating: true }
    }

    case AuthActions.SIGNUP_USER_SUCCESS: {
      return { ...state, authenticating: false, user: action.payload }
    }

    case AuthActions.LOGIN_USER: {
      return { ...state, authenticating: true }
    }

    case AuthActions.LOGIN_USER_SUCCESS: {
      return { ...state, authenticating: false, user: action.payload }
    }

    case AuthActions.LOGIN_USER_FAILURE: {
      return { ...state, authenticating: false }
    }

    default: {
      return state
    }
  }
}

export { reducer as authReducer }
