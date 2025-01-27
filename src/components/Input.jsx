import React, { useState } from 'react'
import { addTodo } from '../redux/slices/todoSlice'
import {useDispatch} from 'react-redux'

function Input() {
    const [todo, setTodo] = useState('')
    const dispatch = useDispatch()
    const TodoHandler = (e) =>{
        e.preventDefault()
        dispatch(addTodo(todo))
        setTodo('')
    }
    return (
        <form className="flex" onSubmit={TodoHandler}>
            <input
                type="text"
                placeholder="Write Todo..."
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
                value={todo}
                onChange={(e) => setTodo(e.target.value)}
             />
              <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600
               text-white shrink-0">
              Add
            </button> 
        </form>
       
    )
}

export default Input
