import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addTodo, setTodo } from 'redux/actions/actions'
import randomId from 'features/randoms/randomId'


const Header = () => {
    const dispatch = useDispatch()
    const todoItem = useSelector(state => state.todo.todoItem)

    const handleAddTodo = e => {
        e.preventDefault()
        if (todoItem.valueInput.trim().length !== 0) {
            todoItem.valueInput = todoItem.valueInput.trim()
            dispatch(addTodo(todoItem))
    
            dispatch(setTodo({
                id: null,
                valueInput: ''
            }))
        }
    }

    const handleSetTodo = (value) => {
        const setTodoObj = {
            id: randomId(),
            valueInput: value
        }
        dispatch(setTodo(setTodoObj))
    }

    return (
        <header className="header">
            <h1>todos</h1>
            <form onSubmit={handleAddTodo}>
                <input
                    className="new-todo"
                    placeholder="What needs to be done?"
                    autoFocus
                    
                    value={todoItem.valueInput}
                    onChange={e => handleSetTodo(e.target.value)}
                />
            </form>
        </header>
    )
}

export default Header
