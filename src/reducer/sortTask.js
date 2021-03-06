import * as types from "../constants/actionType";


var initialState ={
    sortby: 'name',
    status: -1,
};

var myReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SORT_TASK:
      return {
        sortby: action.sort.sortby,
        status: action.sort.status
      };
    
    default:
      return state;
  }
};

export default myReducer;