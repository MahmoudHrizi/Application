import { combineReducers } from "redux";
import authReducer from "./authReducer";
import clientReducer from "./clientReducer";
import adminReducer from './adminReducer'
//import adminReducer from "./adminReducer";
const rootReducer = combineReducers({
  authReducer,
  clientReducer,
  adminReducer
});

export default rootReducer;