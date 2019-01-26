import { Reducer } from 'redux'
import { AuthState, AuthActions } from './types'

const INITIAL_STATE: AuthState = {
  email: '',
  password: '',
}

const reducer: Reducer<AuthState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AuthActions.EMAIL_CHANGED: {
      return { ...state, email: action.email }
    }

    case AuthActions.PASSWORD_CHANGED: {
      return { ...state, password: action.password }
    }

    default: {
      return state
    }
  }
}

export { reducer as authReducer }
