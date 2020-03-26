import ReduxTypes from "./types";

export const changeSearch = value => ({
  type: ReduxTypes.CHANGE_SEARCH,
  payload: value
});
export const changeTab = value => ({
  type: ReduxTypes.CHANGE_TAB,
  payload: value
});
