import { action } from 'typesafe-actions'
import { EthActions } from './types'

export const signupUserSuccess = () => action(EthActions.SIGNUP_USER_SUCCESS)
export const loginUserSuccess = () => action(EthActions.LOGIN_USER_SUCCESS)
