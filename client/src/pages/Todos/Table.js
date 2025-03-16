import React, { useEffect, useState } from "react";
import axios from "axios";   //server sy communicate krny k leay 


export default function Table() {
  const [isLoading, setisLoading] = useState(true);
  const [document, setDocument] = useState([]);

  const URL = "http://localhost:8000";


  // ------------------read the data (axios get ) methid----------
  useEffect(() => {
    axios.get(`${URL}/readTodo`)

      .then((res) => {
        const data = res.data
        setDocument(data)
        console.log('readdata_array', data)
      })
      .catch((err) => {
        console.log('err', err)
      })
      .finally(() => {
        setisLoading(false)
      })
  }, [])

// -------handleEdit-------
const handleEdit=todo=>{
  console.log('todo for edit', todo)
  axios.post(`${URL}/updateTodo`,todo)   //ya wo state ha jo ham ny data store karvana
    
    .then((res)=>{
      console.log('update_res', res)
    })
    .catch((err)=>{
      console.log('err', err)
    })
}
// -------handleDelete-------
const handleDelete=todo=>{

  console.log('todo for Delete', todo)
  axios.post(`${URL}/deleteTodo`,todo)   //ya wo state ha jo ham ny data store karvana
    
  .then((res)=>{
    console.log('delete_res', res)
  })
  .catch((err)=>{
    console.log('err', err)
  })

}


  

  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col mb-3">
            <h1 className="text-center">Your Todos </h1>
          </div>

        </div>
        <div className="row">
          <div className="col">
            {!isLoading
              ?<table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Location</th>
                  <th scope="col">Description</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {document.map((todo ,i)=>{
                  
                  return(
                    
                    <tr key={i}>
                  <th scope="row">{i+1}</th>
                  <td>{todo.title}</td>
                  <td>{todo.location}</td>
                  <td>{todo.description}</td>
                  <td>
                    <button className="btn btn-sm btn-info m-1" onClick={()=>{handleEdit(todo)}}>Edit</button>
                    <button className="btn btn-sm btn-danger m-1" onClick={()=>{handleDelete(todo)}}>Delete</button>
                  </td>
                </tr>
                  )
                })}
                
                
              </tbody>
            </table>
            : <div className="d-flex justify-content-center align-items-center"><span className="spinner spinner-border"></span></div>
              }
          </div>
        </div>
      </div>
    </div>
  );
}
