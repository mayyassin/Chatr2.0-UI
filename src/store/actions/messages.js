import axios from "axios";
import { setErrors } from "./errors";
import * as actionTypes from "../actions/actionTypes";

const instance = axios.create({
  baseURL: "https://api-chatr.herokuapp.com/"
});

export const fetchMessages = channelID => {
  return dispatch => {
    instance
      .get(`channels/${channelID}/`)
      .then(res => res.data)
      .then(channel => {
        dispatch({ type: actionTypes.FETCH_MESSAGES, payload: channel });
      })
      .catch(error => console.error(error.response.data));
  };
};
export const postMessage = (newMessage, channelID) => {
  return dispatch => {
    instance
      .post(`/channels/${channelID}/send/`, newMessage)
      .then(res => res.data)
      .then(createdMessage => {
        dispatch({
          type: actionTypes.POST_MESSAGE,
          payload: createdMessage
        });
      })
      .catch(error => console.error(error.response.data));
  };
};

export const resetMessage = () => {
  return dispatch => {
    dispatch({ type: actionTypes.RESET_MESSAGE });
  };
};

export default fetchMessages;
