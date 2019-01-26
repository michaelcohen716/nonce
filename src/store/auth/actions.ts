import { action } from 'typesafe-actions'

import { AuthActions } from './types'

export const emailChanged = (email: string) =>
  action(AuthActions.EMAIL_CHANGED, email)
export const passwordChanged = (password: string) =>
  action(AuthActions.PASSWORD_CHANGED, password)
