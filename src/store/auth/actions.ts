import { action } from 'typesafe-actions'
import { AuthActions } from './types'

export const signupUser = () => action(AuthActions.SIGNUP_USER)
export const signupUserSuccess = (email: string) =>
  action(AuthActions.SIGNUP_USER_SUCCESS, email)

export const loginUser = () => action(AuthActions.LOGIN_USER)
export const loginUserSuccess = (email: string) =>
  action(AuthActions.LOGIN_USER_SUCCESS, email)

export const loginUserFailure = () => action(AuthActions.LOGIN_USER_FAILURE)
