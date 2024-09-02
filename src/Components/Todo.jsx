import React, { useEffect, useState } from 'react'

export const Todo = () => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [todos, setTodos] = useState([])
    // console.log(todos)
    const[error, setError] = useState("")
    const[message, setMessage] = useState("")
    const[editId,setEditId] = useState(1) //default -1 
    const[updatedTitle, setUpdateTitle] = useState("")
    const[updatedDescription, setUpdatedDescription] = useState("")
    // console.log(editId)
    const apiUrl = "http://localhost:5000/"
    const handleSubmit = ()=>{
        setError("")
        //check inputs
        if(title.trim() !== '' && description.trim() !== ''){
            fetch(apiUrl+"todos",{
                method:"POST",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({title,description})
            }).then((res)=>{
               if(res.ok){
                 //add item to list
            setTodos([...todos, {
                title,description
            }])
            setMessage("Item added successfully")
            setTitle("")
            setDescription("")
            setTimeout(()=>{
                setMessage("")
            },2000)
               }else{
                //set error
               setTimeout(()=>{
                setError("Unable to create Todos item")
               }, 200)
               }
            }).catch(()=>{
                setError("Unable to create Todo item")
                setTimeout(()=>{
                    setError("")
                },4000)
            })
           
        }
    }
    const handleUpdate = () =>{
        setError("")
        //check inputs
        if(updatedTitle.trim() !== '' && updatedDescription.trim() !== ''){
            fetch(apiUrl+"todos/"+editId,{
                method:"PUT",
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({title:updatedTitle,description:updatedDescription})
            }).then((res)=>{
               if(res.ok){
                 //update item to list
               const updatedTodos =  todos.map((item)=>{
                    if(item._id == editId){
                        item.title = updatedTitle;
                        item.description = updatedDescription;
                    }
                    return item;
                })
            setTodos(updatedTodos)
            setMessage("Item updated successfully")
            setUpdateTitle("")
            setUpdatedDescription("")
            setTimeout(()=>{
                setMessage("")
            },2000)
            setEditId(-1)
               }
            else{
                //set error
               setTimeout(()=>{
                setError("Unable to create Todos item")
               }, 200)
               }
            }).catch(()=>{
                setError("Unable to create Todo item")
                setTimeout(()=>{
                    setError("")
                },4000)
            })
           
        }
    }
    const handleDelete = (id) =>{
        if(window.confirm("Are you sure want to delete this item")){
            fetch(apiUrl+"todos/"+id,{
                method:"DELETE"
            })
            .then(()=>{
                const updatedTodos = todos.filter((item)=>item._id !== id)
                setTodos(updatedTodos) 
            })
            
        }
    }
    const handleCancel  = () =>{
        setEditId(1)
    }
    //handle update
    const handleEdit = (item) =>{
        setEditId(item._id);
        setUpdateTitle(item.title);
        setUpdatedDescription(item.description)
    }
    
    //fetching and displaying data from ther backend
    useEffect(()=>{
       getItems()
    },[])
    const getItems = ()=>{
        fetch(apiUrl+"todos")
        .then((res)=> res.json())
        .then((res)=>{
            setTodos(res)
        })
       }
  return (
    <>
    <div className='row p-3 bg-success text-light'>
        <h1>Todo Project with MERN stack </h1>
    </div>
    <div className="row">
        <h3 className=''>Add Item</h3>
        {message && <p className='text-success'>{message}</p>}
        <div className="form-group d-flex gap-2">
        <input placeholder="Title"className="form-control" type="text" onChange = {(e)=> setTitle(e.target.value)}value={title}/>
        <input placeholder='Description'  className="form-control" type="text" onChange = {(e)=> setDescription(e.target.value)} value={description} />
        <button className='btn btn-dark' onClick={handleSubmit} onKeyDown={handleSubmit}>Submit</button>
        </div>
        {error && <p className='text-danger'>{error}</p>}
    </div>
    <div className="row mt-3">
        <h3>Tasks</h3>
       <div className='col-md-8'>
       <ul className='list-group'>
           {
            todos.map((item)=>(
                <li key ={item._id} className='list-group-item bg-info fw-bolder  align-items-center d-flex justify-content-between my-2'>
                {
                    editId === -1 || editId !== item._id ? <>
                <div className='d-flex flex-column '>
                <span className='text-capitalize'> {item.title}</span>
                 <span >{item.description}</span>
                </div>
                    </> : <>
      <div className="form-group d-flex gap-2 me-2">
        <input placeholder="Title"className="form-control" type="text" onChange = {(e)=> setUpdateTitle(e.target.value)}value={updatedTitle}/>
        <input placeholder='Description'  className="form-control" type="text" onChange = {(e)=> setUpdatedDescription(e.target.value)} value={updatedDescription} />

        </div>
                    </>
                }
                 <div className='d-flex gap-3'>
                { editId === -1 || editId !== item._id? <button className='btn btn-warning ' onClick={()=>handleEdit(item)}>Edit</button>: <button className='btn btn-warning' onClick={handleUpdate}>update</button>}
                { editId === -1 || editId !== item._id ? <button className='btn btn-danger' onClick={()=>handleDelete(item._id)}>Delete</button>: <button className='btn btn-danger' onClick={handleCancel}>Cancel</button>}
                 </div>
                 </li>
            ))
           }
        </ul>
       </div>
    </div>
    </>
    
    
  )
}
