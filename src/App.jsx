import { useState, useEffect} from 'react'
import { TodoProvider } from './contexts/todoContext'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (todo) => {
    // We used ... to spread the todo and prev so that data from TodoForm can fit here
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev])
  }

  //for Update we need ID and todo, we use map for looping to find that id
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo)))
  }

  //for Delete use Filter method of js
  const deleteTodo = (id) =>{
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  //for toggle use map to loop for id then check id and change the completed status accordingly
  const toggleComplete = (id) => {
    setTodos((prev) =>
       prev.map((prevTodo) => 
        prevTodo.id === id ? {...prevTodo, completed: !prevTodo.completed} : prevTodo))
  }


  //////////////////////////////////////
  ////////// Local Storage /////////////
  //////////////////////////////////////

  // 1. To get from LocalStorage
    useEffect(() => {
      //localStorage stores in string format so we have to set it into JSON format
    const todos = JSON.parse(localStorage.getItem("todos"))

    if(todos && todos.length > 0){
      setTodos(todos)
    }
  }, [])
  
  // 2. To set in LocalStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])


  return (
    //You should also give values from Provider then only it will work
    <TodoProvider value={{todos, addTodo, deleteTodo, updateTodo,toggleComplete}}>
            <div className="bg-[#172842] min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id} 
                          className='w-full'>
                            <TodoItem todo={todo}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
