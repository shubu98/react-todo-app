import React from 'react'
import axios from 'axios'
import { useState } from 'react'
import { useEffect } from 'react'

const TodoApp = () => {
    const [todo,setTodo] = useState('')
    const [todos,setTodos] = useState([])

    const fetchTodos = async () => {
    try {
      const res = await axios.get("http://localhost:5000/todos");
      setTodos(res.data);
    } catch (err) {
      console.error("Error fetching todos:", err);
    }
  };

    useEffect(()=>{
        fetchTodos()
    },[])

    const handleOnchange =(e) =>{
        setTodo(e.target.value)
    }

    const handleSubmit =async(e) =>{
        e.preventDefault()
        await axios.post("http://localhost:5000/create-todo",{todo})
        alert("Todo Create")
        setTodo(''); // clear input
        fetchTodos(); // refresh list
    }

    const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      // Update UI immediately
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='w-full h-screen flex flex-col items-center justify-center bg-linear-to-br px-6 from-blue-100 via-white to-blue-200'>
        <div className='w-full h-[150px] flex items-center justify-center'>
            <div className="bg-white shadow-lg rounded-2xl p-5 w-[600px] border border-gray-200">
            <form onSubmit={handleSubmit} className='w-full h-full flex gap-5'>
                <input className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" type="text" placeholder='Enter Your Todo' value={todo} onChange={handleOnchange}/>
                <button className="w-[130px] cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded-lg transition duration-300" type='submit'>Add Todo</button>
            </form>
        </div>
        </div>
        
        <div className="bg-white shadow-lg rounded-2xl p-5 w-[60%] flex flex-col justify-between border border-gray-200">
            <h1 className='text-2xl font-extrabold text-red-500'>Your Todo's Here</h1>
            <div className='mt-5'>
                {todos.length>0?todos.map((item,index)=>(
                    <div key={index} className='flex mt-2 w-full'>
                        <p className='flex w-[90%] text-gray-500 font-semibold gap-2 m-2 text-[18px]'>{index + 1}. {item.todo}</p>
                        <button className='cursor-pointer bg-red-500 px-5 py-2 font-semibold rounded-md' onClick={()=>handleDelete(item._id)}>Delete</button>
                    </div>
                )):("No Todos")}
            </div>
        </div>
    </div>
  )
}

export default TodoApp