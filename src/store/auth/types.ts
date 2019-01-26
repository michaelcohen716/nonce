export enum AuthActions {
  EMAIL_CHANGED = 'EMAIL_CHANGED',
  PASSWORD_CHANGED = 'PASSWORD_CHANGED',
}

export interface AuthState {
  email: ''
  password: ''
}
