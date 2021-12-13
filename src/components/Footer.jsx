import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom'
import { removeAllTodoComp, setStatusBtn } from 'redux/actions/actions'
import queryString from 'query-string'

const Footer = () => {
    const dispatch = useDispatch()
    const todoList = useSelector(state => state.todo.todoList)
    const [emptyList, setEmptyList] = useState(false)
    const [status, setStatus] = useState(() => {
        return JSON.parse(localStorage.getItem('status_btn')) ?? 'all'
    })

    const location = useLocation()
    const match = useRouteMatch()
    const history = useHistory()


    const handleAllStatus = () => {
        const params = queryString.stringify({status: 'all'})
        history.push({
            pathname: match.pathname,
            search: params
        })
    }

    const handleActiveStatus = () => {
        const params = queryString.stringify({status: 'active'})
        history.push({
            pathname: match.pathname,
            search: params
        })
    }

    const handleCompletedStatus = () => {
        const params = queryString.stringify({status: 'completed'})
        history.push({
            pathname: match.pathname,
            search: params
        })
    }

    useEffect(() => {
        const paramsSearch = queryString.parse(location.search)
        setStatus(paramsSearch.status || 'all')

        dispatch(setStatusBtn(paramsSearch.status || 'all'))
    }, [location.search, dispatch])


    const handleDeleteAllTodo = () => {
        dispatch(removeAllTodoComp())
    }
    
    useEffect(() => { // hidden footer if list's empty
        if (todoList.length <= 0)
            setEmptyList(true)
        else
            setEmptyList(false)

    }, [todoList.length])

    useEffect(() => {
        localStorage.setItem('status_btn', JSON.stringify(status))
    }, [status])



    return (
        <footer className={`footer ${emptyList ? 'hidden' : ''}`}>
            <span className="todo-count"><strong>{todoList.length}</strong> item left</span>
            <ul className="filters">
                <li
                    onClick={e => {
                        handleAllStatus()
                        e.preventDefault()
                    }}
                >
                    <a href='/' className={status === 'all' ? 'selected' : ''}>All</a>
                </li>
                <li
                    onClick={e => {
                        handleActiveStatus()
                        e.preventDefault()
                    }}
                >
                    <a href='/' className={status === 'active' ? 'selected' : ''}>Active</a>
                </li>
                <li
                    onClick={e => {
                        handleCompletedStatus()
                        e.preventDefault()
                    }}
                >
                    <a href='/' className={status === 'completed' ? 'selected' : ''}>Completed</a>
                </li>
            </ul>
            <button
                className="clear-completed"
                onClick={handleDeleteAllTodo}
            >
                Clear completed
            </button>
        </footer>
    )
}

export default Footer
