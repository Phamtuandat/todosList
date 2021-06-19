import * as types from './../constants/actionType';

export const listAll = () => {
    return {
        type: types.LIST_ALL
    }
}
export const saveTask = (task) => {
    return {
        
        type: types.SAVE_TASK,
        task
    }
}
export const togglesForm = () => {
    return {
        type : types.TOGGLE_FORM,
    }
}
export const closeForm = () => {
    return {
        type : types.CLOSE_FORM
    }
}
export const openForm = () => {
    return {
        type : types.OPEN_FORM
    }
}
export const updateTask = (task) => {
    return {
        type : types.UPDATE_TASK,
        task
    }
}
export const removeTask = (task) => {
    return {
        type : types.DELETE_TASK,
        task
    }
}
export const toggleStatus = (task) => {
    return {
        type : types.TOGGLE_STATUS,
        task
    }
}
export const filterTask = (filter) => {
    return {
        type : types.FILTER_TASK,
        filter
    }
}
export const sortTask = (sort) => {
    return {
        type : types.SORT_TASK,
        sort
    }
}