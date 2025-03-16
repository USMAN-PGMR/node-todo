const mongoose = require("mongoose")



// create schema 
const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        requires:true
    },
    location: {
        type: String,
        requires:true
    },
    description: {
        type: String,
        requires:true
    },
})

// create model jis me data store karvana
const TodoModel= new mongoose.model("todos",TodoSchema)      //yaha collection name dana ha jis me data store karvana jis tarha abi "todos"

// dosri files me use krny k leay export
module.exports=TodoModel;