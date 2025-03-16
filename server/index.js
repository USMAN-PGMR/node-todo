require('dotenv').config()    //to import dotenv for using the .env file
const express = require("express");
const mongoose = require("mongoose");
const app = express()
const cors= require ("cors")   //cors ko enable krna prta ha ta k different domains pr sai sy data chaly
//  Cross-Origin Resource Sharing. It's a mechanism that lets a browser request resources from a server on a different domain. CORS is an extension of the

// -------todoModel import from models
const TodoModel=require("./models/Todos")
// is url sy mongo db ko application k sath connect krna ha 
let mongo_URL=process.env.DB_URL

// -----------------uses & connections--------------------
mongoose.connect(mongo_URL)
app.use(cors()) //cors ko app me use krna
app.use(express.json()) // json ki files ko read krna ta k server me data show ho 



//------------------------ Handle POST request
// jo client sy reqest ayain means k res,req
// app.post('/addtodo',(req,res)=>{
//     //const {body}=req  //jo request ayi osy body me get/store karna 
//     let todo = req.body
//     console.log('todo', todo)

//     // send respons
//     res.send('data received')
// })
// ----NOW handle the request and store in mogo 
app.post('/addtodo',async(req,res)=>{
    //const {body}=req  //jo request ayi osy body me get/store karna 
    let todo = req.body
    const newTodo=new TodoModel(todo)
    console.log('todo', todo)
    try{
        await newTodo.save()
        res.json(todo)
    }
    catch(err){
        res.json(err)
    }

    // send respons
    // res.send('data received')
})

// -------HANDLE GET REQUEST-------------for read the data

app.get('/readTodo',async(req,res)=>{
    let todos = await TodoModel.find()
    console.log('todos-read', todos)
    res.send(todos)
    
})
// -------update todo ****** HANDLE Post REQUEST-------------for read the data

app.post('/updateTodo',async(req,res)=>{
    let todo = req.body
    await TodoModel.findByIdAndUpdate(todo._id, {title:"updated title"});
    // console.log('todos-read', todos)
    res.send("todo updated")
    
})
// -------Delete todo ****** HANDLE Post REQUEST-------------for read the data

app.post('/deleteTodo',async(req,res)=>{
    let todo = req.body
    await TodoModel.findByIdAndDelete(todo._id);
    // console.log('todos-read', todos)
    res.send("todo deleted")
    
})

// ---------server------------
const PORT = 8000
app.listen(PORT,()=>{
    console.log('Server is runnning on port :', PORT)
})