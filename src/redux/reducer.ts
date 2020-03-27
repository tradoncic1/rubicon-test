import ReduxTypes from "./types";

const INITIAL_STATE = {
  searchValue: "",
  selectedTab: "tv"
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ReduxTypes.CHANGE_SEARCH:
      return {
        ...state,
        searchValue: action.payload
      };
    case ReduxTypes.CHANGE_TAB:
      return {
        ...state,
        selectedTab: action.payload
      };
    default:
      return state;
  }
};

export default reducer;
