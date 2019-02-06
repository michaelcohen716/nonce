import { Reducer } from 'redux'
import { EthState, EthActions } from './types'
import { generateOrImportKeystore } from '../../keystore'

const INITIAL_STATE: EthState = {
  address: '',
}

const reducer: Reducer<EthState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default: {
      return state
    }
  }
}
