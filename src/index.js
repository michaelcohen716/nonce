import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import reducers from "./redux/reducers";
import ReduxThunk from "redux-thunk";
import logger from "redux-logger";
import { Provider } from "react-redux";
import App from "./App";
import CreateEvent from "./components/CreateEvent";
import { Switch } from "react-router";
import { BrowserRouter as Router, Route } from "react-router-dom";


const store = createStore(reducers, {}, applyMiddleware(ReduxThunk, logger));

ReactDOM.render(
  <Provider store={store}>
    <Router>
        <Switch>
            <Route initial path="/create" component={CreateEvent} />
            <Route path="/" component={App} />
        </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);
