import * as types from "./../constants/actionType";


var initialState ={
  name: "",
  status: false,
  id: "",
};

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_TASK:
      return action.task;
    case types.TOGGLE_FORM: 
      return {
        name: '',
        id: '',
        status: false
      }
    default:
      return state;
  }
};

export default myReducer;