import { LOAD_USER } from './actions';

const INITIAL_STATE = {
  user: ''
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOAD_USER: {
      return {
        ...state,
        user: action.email
      }
    }
    default:
      return state;
  }
};
