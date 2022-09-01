import * as actionCreators from "./actions/movieActions";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./reducers/index";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";

const composeEnhancers = composeWithDevTools({
  actionCreators,
  trace: true,
  traceLimit: 25,
});

let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

export default store;
