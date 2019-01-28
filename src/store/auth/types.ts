export enum AuthActions {
  SIGNUP_USER = 'SIGNUP_USER',
  SIGNUP_USER_SUCCESS = 'SIGNUP_USER_SUCCESS',
  LOGIN_USER = 'LOGIN_USER',
  LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS',
  LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE',
}

export interface AuthState {
  authenticating: boolean
  user: string
}
