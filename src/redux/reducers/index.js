import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import movieDetailReducer from "./movieDetailReducer";
import movieFilterReducer from "./movieFilterReducer";

export default combineReducers({
  movie: movieReducer,
  movieDetail: movieDetailReducer,
  movieFilter: movieFilterReducer,
});
