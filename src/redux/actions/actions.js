import {
    SET_TODO,
    ADD_TODO,
    CHANGE_TODO,
    REMOVE_A_TODO,
    REMOVE_ALL_TODO_COMP,
    TOGGLE_STATUS,
    TOGGLE_ALL_STATUS,
    SET_STATUS_BTN
} from 'redux/constants/action-types'


export const setTodo = (payload) => ({
    type: SET_TODO,
    payload
})

export const addTodo = (payload) => ({
    type: ADD_TODO,
    payload
})

export const changeTodo = (payload) => ({
    type: CHANGE_TODO,
    payload
})

// ----------------------------------------------------------------

export const removeATodo = (payload) => ({
    type: REMOVE_A_TODO,
    payload
})

export const removeAllTodoComp = (payload) => ({
    type: REMOVE_ALL_TODO_COMP,
    payload
})

// ----------------------------------------------------------------

export const toggleStatus = (payload) => ({
    type: TOGGLE_STATUS,
    payload
})

export const toggleAllStatus = (payload) => ({
    type: TOGGLE_ALL_STATUS,
    payload
})

// ----------------------------------------------------------------

export const setStatusBtn = (payload) => ({
    type: SET_STATUS_BTN,
    payload
})