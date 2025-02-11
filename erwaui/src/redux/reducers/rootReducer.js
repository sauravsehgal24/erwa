import { combineReducers } from "redux";
import {messageReducer} from "./messageReducer";
import activePageReducer from "./activePageReducer";
import authReducer from "./userReducer";

const rootReducer = combineReducers({
  message: messageReducer,
  activePage:activePageReducer,
  user:authReducer
});

export default rootReducer;