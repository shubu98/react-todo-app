const express = require('express')
const app = express()
const Todo = require('./model/TodoModel')
const cors = require('cors')

app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.get('/todos',async(req,res)=>{
    const todoss = await Todo.find()
    res.json(todoss)
})

app.post('/create-todo',async(req,res)=>{
    try {
        const {todo} = req.body
        const createdTodo = await Todo({
        todo
        })

        await createdTodo.save()
        res.json({message:'Todo create successfullt', createdTodo})
    } catch (error) {
        res.send('todo create error',error)
    }
})

app.delete('/delete/:id',async(req,res)=>{
    try {
        const {id} = req.params
        const deletedTodo = await Todo.findByIdAndDelete(id)
        if (!deletedTodo) {
      return res.status(404).json({ message: "Todo not found" });
    }
        
        res.json("Delete Todo")
    } catch (error) {
        res.send(error)
    }
})

app.listen(5000,()=>{
    console.log("Server is Running of 5000 port number");
})