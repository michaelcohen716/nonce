import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reducers from "./redux/reducers";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";
import SampleApp from "./App";
import { BrowserRouter as Router, Route } from "react-router-dom";


const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Route path="/" component={SampleApp} />
    </Router>
  </Provider>,
  document.getElementById("root")
);
