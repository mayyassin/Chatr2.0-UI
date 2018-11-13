import * as actionTypes from "../actions/actionTypes";

const initialState = {
  messages: [],
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_MESSAGES:
      return {
        ...state,
        messages: action.payload,
        loading: false
      };
    case actionTypes.POST_MESSAGE:
      return {
        ...state,
        messages: state.messages.concat(action.payload)
      };

    case actionTypes.RESET_MESSAGE:
      return {
        ...state,
        messages: []
      };
    default:
      return state;
  }
};

export default reducer;
