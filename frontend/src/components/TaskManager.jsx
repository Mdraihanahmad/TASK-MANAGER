import React, { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";
import { IoMdAddCircle } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import { toast } from 'react-toastify';
import { useForm } from "react-hook-form"
import axios from '../api/configAxios';


const TaskManager = () => {
    const [todo, setTodo] = useState([]);
    const [loading, setLoading] = useState(false)
    // const [isFetching, setIsFetching] = useState(false)
    const [deletingId, setDeletingId] = useState(null); // ✅ track which item is being deleted

    const { register, handleSubmit, reset, formState: { errors } } = useForm()

    const fetchTodos = async () => {
        // setIsFetching(true)
        try {
            const { data } = await axios.get('/')
            const tasks = Array.isArray(data.tasks) ? data.tasks : [];
            setTodo(tasks)
            
        } catch (error) {
            toast.error("Failed to fetch todos");
        } finally{
            // setIsFetching(false)
        }
    }

    const toggleComplete = async (id) => {
        try {
            const current = todo.find(t => t._id === id)
            const currentCompleted = current.completed === "true" || current.completed === true;
            const updated = { ...current, completed: !currentCompleted }
            await axios.patch(`/${id}`, updated)
            console.log(updated);

            fetchTodos()
        } catch (error) {
            toast.error("toggle failed")
        }
    }

    const handleDelete = async (id) => {
        setDeletingId(id)
        try {
            await axios.delete(`/${id}`)
            fetchTodos()
            toast.error("Deleted Successfully")
        } catch (error) {
            toast.error("Deletion failed")
        }finally{
            setDeletingId(null)
        }
    }

    useEffect(() => {
        fetchTodos()
    }, [])



    const onSubmit = async (data) => {
        const title = data.title
        if (!(title.trim())) {
            toast.error("Todo cannot be empty")
            return;
        }

        if(loading) return;

        setLoading(true)


        try {
            await axios.post('/', {
                title,
                completed: false
            })
            fetchTodos();
        } catch (error) {
            toast.error("Failed to add task");
        } finally{
            setLoading(false)
        }

        reset()
        toast.success("Task added successfully")
    }

    return (
        <div className="px-22  max-w-md mx-auto mt-10">
            <h2 className="text-xl font-bold mb-4">Heart Space 💕</h2>
            <form className="mb-4 flex" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="text"
                    {...register("title", { required: "Todo cannot be empty" })}
                    className="border px-3 py-1 mr-2 rounded text-[13px]"
                    placeholder="Share your Feelings..."
                />

                <button type='submit' disabled={loading} className="cursor-pointer text-3xl px-3 py-1">{loading?<AiOutlineLoading3Quarters className='animate-spin'/>:<IoMdAddCircle />}</button>

            </form>
            <ul className="list-disc list-inside">
                {todo.length == 0 && <h1>No data</h1>}
                
                {todo.map((item, index) => (

                    <li key={index} className={`flex justify-between items-center mb-2 ${item.completed? "line-through text-gray-500" : ""
                        }`}>

                        <>

                            <span
                                onClick={() => toggleComplete(item._id)}
                                className="cursor-pointer">{item.title}</span>
                            <div>

                                <button
                                    onClick={() => handleDelete(item._id)}
                                    disabled = {deletingId === item._id}
                                    className="cursor-pointer px-2 py-1 text-2xl rounded ml-2"
                                >
                                    {deletingId === item._id ?<AiOutlineLoading3Quarters className='animate-spin'/> :<FaDeleteLeft /> }
                                    
                                </button>
                            </div>
                        </>

                    </li>
                ))}
            </ul>
        </div>
    )
}
export default TaskManager