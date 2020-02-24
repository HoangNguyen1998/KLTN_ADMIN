import { combineReducers } from "redux";
import usersReducer from "./Users";

const rootReducer = combineReducers({
  Users: usersReducer
});

export default rootReducer;
