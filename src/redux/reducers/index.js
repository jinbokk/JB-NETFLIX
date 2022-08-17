import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import movieDetailReducer from "./movieDetailReducer";
import movieSearchReducer from "./movieSearchReducer";

export default combineReducers({
  movie: movieReducer,
  movieDetail: movieDetailReducer,
  movieSearch: movieSearchReducer,
});
