import { combineReducers } from 'redux';
import tasks from './Tasks';
import isDisplayForm from './isDisplayForm';
import editTask from './editTask';
import filterTask from './filterTask';
import sortTask from './sortTask';





const myReducer =  combineReducers({
    tasks,
    isDisplayForm,
    editTask,
    filterTask,
    sortTask
});

export  default myReducer