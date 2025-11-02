const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/TodoApp")
.then(()=>console.log('MongoDB connect'))
.catch((error)=>console.log('MongoDB connection error',error))

const TodoSchema = new mongoose.Schema({
    todo:{
        type:String,
        required:true,
    }
})

const Todo = mongoose.model('Todo',TodoSchema)
module.exports = Todo