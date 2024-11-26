import {createSlice, nanoid} from '@reduxjs/toolkit'

const saveTodosToLocalStorage = (todos) => {
    try {
        localStorage.setItem('todos', JSON.stringify(todos));
        
    } catch (e) {
        console.error("Failed to save todos to localStorage", e);
    }
};

const initialState = {
    todos: JSON.parse(localStorage.getItem('todos')) ? JSON.parse(localStorage.getItem('todos')) : []
};


export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            const todo = {
                id: nanoid(),
                title: action.payload,
                completed: false
            }
            state.todos.push(todo)
            saveTodosToLocalStorage(state.todos)
        },
        removeTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => action.payload !== todo.id)
            saveTodosToLocalStorage(state.todos)
        },
        toggleComplete: (state, action) => {
            state.todos = state.todos.map((todo) => 
                todo.id === action.payload 
                    ? { ...todo, completed: !todo.completed } : todo
            );
            saveTodosToLocalStorage(state.todos)
        },
        editTodo: (state, action) => {
            const {id, title} = action.payload
            state.todos = state.todos.map((todo) => 
                todo.id === id ? {...todo,title: title} : todo
            )
            saveTodosToLocalStorage(state.todos)
        }
        
    }
})

export const {addTodo, removeTodo, toggleComplete, editTodo} = todoSlice.actions

export default todoSlice.reducer