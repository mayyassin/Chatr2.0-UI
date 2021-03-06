import { combineReducers } from "redux";

// Reducers
import authReducer from "./authentication";
import errorReducer from "./errors";
import channelsReducer from "./channels";
import messagesReducer from "./messages";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  channels: channelsReducer,
  messages: messagesReducer
});
