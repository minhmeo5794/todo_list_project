import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { changeTodo, removeATodo, toggleAllStatus, toggleStatus } from 'redux/actions/actions'

const Main = () => {
    const dispatch = useDispatch()
    const todoList = useSelector(state => state.todo.todoList)
    const completedList = useSelector(state => state.todo.completedList)
    const statusBtn = useSelector(state => state.todo.statusBtn)
    const [isCompletedList, setIsCompletedList] = useState(() => {
        return todoList.length === completedList.length ? true : false
    })
    const [todoId, setTodoId] = useState()
    const [editValue, setEditValue] = useState('')
    const editingInput = useRef()


    const handleToggleTodo = (id) => {
        dispatch(toggleStatus(id))
    }

    const handleToggleAll = () => {
        const allTodoId = todoList.map(item => item.id)

        setIsCompletedList(!isCompletedList)
        dispatch(toggleAllStatus({
            status: !isCompletedList,
            value: allTodoId
        }))
    }



    const handleEditing = (todoId, valueInput) => {
        setTodoId(todoId)
        setEditValue(valueInput)
    }

    useEffect(() => { // focus input
        if (editingInput.current)
            editingInput.current.focus()
    }, [todoId])

    const handleSetEditValue = (valueInput) => {
        setEditValue(valueInput)
    }



    const handleKeyDown = (keyCode) => {
        if (keyCode === 13) { // Press ENTER

            // Xoá nhiều khoảng trắng ở giữa chuỗi
            const setNewEditValue = editValue.split(' ')
            for (let i = 0; i < setNewEditValue.length; i++) {
                if (setNewEditValue[i].length === 0) {
                    setNewEditValue.splice(i--, 1)
                }
            }

            const changeObj = {
                id: todoId,
                valueInput: setNewEditValue.join(' ')
            }
            dispatch(changeTodo(changeObj))
            setTodoId()
            setEditValue('')
        }
        else if (keyCode === 27) { // Press ESC
            setTodoId()
            setEditValue('')
        }
    }

    const handleBlurOut = () => {
        setTodoId()
        setEditValue('')
    }

    const handleDeleteTodo = ({todoId, index}) => {
        const removeTodoObj = {
            todoId,
            index
        }
        dispatch(removeATodo(removeTodoObj))
    }



    useEffect(() => {
        if (todoList.length !== completedList.length)
            setIsCompletedList(false)
        else
            setIsCompletedList(true)
    }, [completedList.length, todoList.length])

    useEffect(() => {
        localStorage.setItem('todo_list', JSON.stringify(todoList))
    }, [todoList])

    useEffect(() => {
        localStorage.setItem('completed_list', JSON.stringify(completedList))
    }, [completedList])


    return (
        <section className="main">
            <input
                id="toggle-all"
                className="toggle-all"
                type="checkbox"

                onChange={handleToggleAll}
                checked={todoList.length === completedList.length && todoList.length !== 0}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
                {todoList.map((todo, index) => (
                    (statusBtn === 'all' || todo.status === statusBtn) && (
                        <li
                            className={`${completedList.includes(todo.id) ? 'completed' : ''} ${todo.id} ${todo.id === todoId ? 'editing' : ''}`}
                            key={todo.id}
                            {...(todo.id !== todoId && { // avoid reseting past value
                                onDoubleClick: () => handleEditing(todo.id, todo.valueInput)
                            })}
                        >
                            <div className="view">
                                <input
                                    className="toggle"
                                    type="checkbox"
                                    onChange={() => handleToggleTodo(todo.id)}
                                    checked={completedList.includes(todo.id)}
                                    onDoubleClick={e => e.stopPropagation()}
                                />
                                {/* <label><pre>{todo.valueInput}</pre></label> add pre tag to keep white space */}
                                <label>{todo.valueInput}</label>
                                <button
                                    className="destroy"
                                    onClick={() => handleDeleteTodo({todoId: todo.id, index})}    
                                ></button>
                            </div>
                            <input
                                className="edit"
                                id={todo.id}
                                value={editValue}
                                onChange={e => handleSetEditValue(e.target.value)}
                                onKeyDown={e => handleKeyDown(e.which)}
                                onBlur={handleBlurOut}
                                {...(todo.id === todoId && {ref: editingInput})}
                            />
                        </li>
                    )
                ))}
            </ul>
        </section>
    )
}

export default Main
