import { combineReducers } from "redux";
import messageReducer from "./messageReducer";
import activePageReducer from "./activePageReducer";

const rootReducer = combineReducers({
  message: messageReducer,
  activePage:activePageReducer
});

export default rootReducer;