import * as types from "./../constants/actionType";
import randomstring from "randomstring";
import { findIndex, cloneDeep } from "lodash";

var data = JSON.parse(localStorage.getItem("tasks"));

var initialState = data ? data : [];

var myReducer = (state = initialState, action) => {
  var index = -1;
  switch (action.type) {
    case types.LIST_ALL:
      return state;
    case types.SAVE_TASK:
      var task = action.task;
      if (!task.id) {
        task.id = randomstring.generate() + "-" + randomstring.generate();
        state.unshift(task);
      } else {
        index = findIndex(state, (task) => {
          return task.id === action.task.id;
        });
        state[index] = action.task;
      }
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case types.DELETE_TASK:
      if (action.task.id) {
        index = findIndex(state, (task) => {
          return task.id === action.task.id;
        });
        state.splice(index, 1);
      }
      localStorage.setItem("tasks", JSON.stringify(state));
      return [...state];
    case types.TOGGLE_STATUS:
      if(action.task.id){
        index = findIndex(state, (task)=>{
          return task.id === action.task.id
        })
        state[index].status = !state[index].status
      }
      localStorage.setItem("tasks", JSON.stringify(state));
      return cloneDeep(state);
      
      default:
        return state;
      }
    };

export default myReducer;
