import { combineReducers } from "redux";
import {messageReducer} from "./messageReducer";
import activePageReducer from "./activePageReducer";
import authReducer from "./userReducer";
import { receiptReducer } from "./receiptReducer";

const rootReducer = combineReducers({
  message: messageReducer,
  activePage:activePageReducer,
  user:authReducer,
  receipt: receiptReducer
});

export default rootReducer;