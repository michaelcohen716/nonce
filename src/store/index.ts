import { combineReducers, Dispatch, Reducer, Action, AnyAction } from 'redux'
// import { RouterProps } from 'react-native-router-flux'

import { authReducer } from './auth/reducer'
import { AuthState } from './auth/types'

export interface ApplicationState {
  auth: AuthState
}

export interface ConnectedReduxProps<A extends Action = AnyAction> {
  dispatch: Dispatch<A>
}

export const rootReducer = combineReducers<ApplicationState>({
  auth: authReducer,
})
