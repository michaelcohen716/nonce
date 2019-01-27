export enum AuthActions {
  EMAIL_CHANGED = 'EMAIL_CHANGED',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
  SIGNUP_USER = 'SIGNUP_USER',
}

export interface AuthState {
  email: string
  password: string
  authenticating: boolean
}
