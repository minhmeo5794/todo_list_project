
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


const todoState = {
    todoItem: {
        id: null,
        valueInput: '',
        status: 'active'
    },
    todoList: JSON.parse(localStorage.getItem('todo_list')) || [],
    completedList: JSON.parse(localStorage.getItem('completed_list')) || [],
    statusBtn: JSON.parse(localStorage.getItem('status_btn')) ?? 'all'
}

const todoReducer = (state = todoState, action) => {
    switch (action.type) {
        case SET_TODO: {
            return {
                ...state,
                todoItem: {
                    ...state.todoItem,
                    id: action.payload.id,
                    valueInput: action.payload.valueInput
                }
            }
        }
        case ADD_TODO: {
            return {
                ...state,
                todoList: [...state.todoList, action.payload]
            }
        }
        case CHANGE_TODO: {
            const newTodoList = state.todoList.map(item => {
                if (item.id === action.payload.id) {
                    item.valueInput = action.payload.valueInput
                }
                return item
            })
            return {
                ...state,
                todoList: newTodoList
            }
        }


        case REMOVE_A_TODO: {
            const newTodoList = [...state.todoList]
            newTodoList.splice(action.payload.index, 1)
            return {
                ...state,
                todoList: newTodoList,
                completedList: state.completedList.filter(compTodoId => compTodoId !== action.payload.todoId)
            }
        }
        case REMOVE_ALL_TODO_COMP: {
            return {
                ...state,
                completedList: [],
                todoList: state.todoList.filter(item => !state.completedList.includes(item.id))
            }
        }
        

        case TOGGLE_STATUS: {
            const isCompleted = state.completedList.includes(action.payload)
            if (isCompleted) {
                return {
                    ...state,
                    todoList: state.todoList.map(todoItem => {
                        todoItem.id === action.payload && (todoItem.status = 'active')
                        return todoItem
                    }),
                    completedList: state.completedList.filter(compTodoId => compTodoId !== action.payload)
                }
            } else {
                return {
                    ...state,
                    todoList: state.todoList.map(todoItem => {
                        todoItem.id === action.payload && (todoItem.status = 'completed')
                        return todoItem
                    }),
                    completedList: [...state.completedList, action.payload]
                }
            }
        }
        case TOGGLE_ALL_STATUS: {
            return {
                ...state,
                todoList: action.payload.status 
                ? state.todoList.map(todoItem => {
                    todoItem.status = 'completed'
                    return todoItem
                }) : state.todoList.map(todoItem => {
                    todoItem.status = 'active'
                    return todoItem
                }),
                completedList: action.payload.status ? [...action.payload.value] : []
            }
        }


        case SET_STATUS_BTN: {
            return {
                ...state,
                statusBtn: action.payload
            }
        }
        default:
            return state
    }
}



export default todoReducer