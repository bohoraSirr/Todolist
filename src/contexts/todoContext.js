import { createContext, useContext } from "react";

export const TodoContext = createContext({
    todos: [
        {
            id: 1,
            todo: "Todo msg",
            completed: false,
        }
    ],
    addTodo: (todo) => {},
    updateTodo: (id, todo) =>{},
    deleteTodo: (id) => {},
    toggleComplete: (id) => {}
})


//Custom Hook for TodoContext
export const useTodo = () => {
    return useContext(TodoContext)
}

//Create a TodoProvider
export const TodoProvider = TodoContext.Provider