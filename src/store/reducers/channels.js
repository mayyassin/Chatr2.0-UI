import * as actionTypes from "../actions/actionTypes";

const initialState = {
  channelList: [],
  loading: true
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_CHANNELS:
      return {
        ...state,
        channelList: action.payload,
        loading: false
      };

    case actionTypes.POST_CHANNEL:
      return {
        ...state,
        channelList: state.channelList.concat(action.payload)
      };

    case actionTypes.RESET_CHANNEL:
      return {
        ...state,
        channelList: []
      };

    default:
      return state;
  }
};

export default reducer;
