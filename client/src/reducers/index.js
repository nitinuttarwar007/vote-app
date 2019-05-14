import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import { matchesAreLoading, getMatchesData } from "./matchesReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  matchesAreLoading,
  getMatchesData,
});
