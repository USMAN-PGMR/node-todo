import React, { useEffect, useState } from "react";
import axios from "axios";   //server sy communicate krny k leay 

const initialState = { title: "", location: "", description: "" };
export default function AddTodo() {
  const [state, setState] = useState(initialState);

  const URL= "http://localhost:8000";
  //---------------- Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  };


  // ------------------read the data (axios get ) methid----------
   useEffect(()=>{
    axios.get(`${URL}/readTodo`)   
    
    .then((res)=>{
      const data=res
      console.log('readdata_array', data)
    })
    .catch((err)=>{
      console.log('err', err)
    })
   },[])

  //-------------------- Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("state", state);
    // ya oper wala just clo me show karvany or state me get krny k leay 

    let {title,location,description}=state
    title=title.trim()
    location=location.trim()
    description=description.trim()

    if (title.length<3)return alert("Please enter title")
      if (location.length<3)return alert("Please enter location")
      if (description.length<3)return alert("Please enter description")


        let todo = {
          title,location,description,
          // status:"acive",
          // dateCreated:new Date().getTime(),
        }
      // ------------***-------------------
    // server ko request snd using axios
    // axios.post("http://localhost:8000/",state)   //1st method with direct url
    axios.post(`${URL}/addtodo`,todo)   //ya wo state ha jo ham ny data store karvana
    
    .then((res)=>{
      console.log('res', res)
    })
    .catch((err)=>{
      console.log('err', err)
    })
  };

  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col">
            <h1 className="text-center">Add Todo </h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <input
                  type="text"
                  placeholder="Location"
                  name="location" 
                  className="form-control"
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 mb-3">
                <textarea
                  name="description"
                  placeholder="Enter description"
                  className="form-control"
                  onChange={handleChange}
                ></textarea>
              </div>
              <div className="col-6 offset-3 text-center">
                <button type="submit" className="btn btn-primary px-5">
                  Add Todo
                </button> 
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
