import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { toggleComplete, editTodo, removeTodo } from '../redux/slices/todoSlice'
import { useDispatch } from 'react-redux'

function ShowTodos() {
    const [newTitle, setNewTitle] = useState("")
    const [editingId, setEditingId] = useState(null);
    const todos = useSelector((state) => state.todos)
    const dispatch = useDispatch()

    const handleEdit = (todo) => {
        setNewTitle(todo.title || '')
        setEditingId(todo.id)
    }
    const saveTodo = (id) => {
        dispatch(editTodo({id: id, title: newTitle}))
        setEditingId(null)
    }
    return (    
        <div className="flex flex-wrap gap-y-3">
            <div className='w-full'>
            {todos.map((todo) => (       
                 <div key={todo.id}
                 className={`flex border mb-3 border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black  bg-[#ccbed7] items-center
                 ${todo.completed ? "bg-green-300" : "bg-[#ccbed7]"}`}>
                    <input
                        type="checkbox"
                        className="cursor-pointer"
                        checked={todo.completed}
                        onChange={() => dispatch(toggleComplete(todo.id))}
                    />
                    {editingId === todo.id ? (
                        <input
                            type="text"
                            className='border outline-none w-full bg-transparent rounded-lg border-transparent'
                            value={newTitle}
                            onChange={(e) => setNewTitle(e.target.value)}
                        />
                    ): (
                     <input
                        type="text"
                        className={`border outline-none w-full bg-transparent rounded-lg border-transparent ${todo.completed ? "line-through" : ""}`}
                        value={todo.title || ''}
                        // onChange={(e) => setNewTitle(e.target.value)}
                        readOnly={true}
                     />)}
                     {editingId === todo.id ? (
                        <button
                        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                        disabled={todo.completed}
                        onClick={() => saveTodo(todo.id)}
                        >
                        💾
                        </button>
                    ):(
                        <button
                            className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                            disabled={todo.completed}
                            onClick={() => handleEdit(todo)}
                        >
                        ✏️
                        </button>
                    )}
                    {/* Delete Todo Button */}
                    <button
                        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"   
                        onClick={() => dispatch(removeTodo(todo.id))}    
                    >
                        ❌
                    </button>
                 </div>
                    
                
            ))}
            </div>         
        </div>
    )
}

export default ShowTodos
