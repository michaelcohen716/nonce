import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reducers from "./redux/reducers";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";
import SampleApp from "./SampleApp";
import { BrowserRouter as Router, Route } from "react-router-dom";
import initialState from "./redux/initialState";

import SimpleStoreContract from "./contractConnectors/SimpleStore";
// import AccountRegistryContract from "./c"

const configureStoreAsync = async () => {
  let store;
  try {
    var INITIAL_STATE = initialState;
    const simpleStoreFile = new SimpleStoreContract();
    await simpleStoreFile.loadContract();
    INITIAL_STATE.contracts.SimpleStore = simpleStoreFile;

    store = createStore(
      reducers,
      INITIAL_STATE,
      applyMiddleware(ReduxThunk, logger)
    );
  } catch {
    var INITIAL_STATE = initialState;
    store = createStore(
      reducers,
      INITIAL_STATE,
      applyMiddleware(ReduxThunk, logger)
    );
  }

  return store;
};

configureStoreAsync().then(result => {
  const store = result;
  console.log("async", store);
  return ReactDOM.render(
    <Provider store={store}>
      <Router>
        <Route path="/" component={SampleApp} />
      </Router>
    </Provider>,
    document.getElementById("root")
  );
});
