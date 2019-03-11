const INITIAL_STATE = {
  SimpleStore: {},
  Nonce: {},
  AccountRegistry: {}
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
    console.log("action.type", action.type)
      return state;
  }
};
