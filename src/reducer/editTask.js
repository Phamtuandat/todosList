import * as types from "./../constants/actionType";


var initialState = null;

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_TASK:
      return action.task;
    default:
      return state;
  }
};

export default myReducer;