import * as types from "../constants/actionType";

var initialState = false;

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_FORM:
      return !state;
    case types.OPEN_FORM:
        return state = true;
    case types.CLOSE_FORM:
        return state = false;
    default:
      return false;
  }
};
export default myReducer;
