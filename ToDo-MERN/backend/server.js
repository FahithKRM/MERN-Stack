const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Todo = require('./Models/Todo');
const { todo } = require('node:test');
require('dotenv').config()

const port = 3001;
app.use(express.json());
app.use(cors());

const connectionString = process.env.MONGO_URI
mongoose
    .connect(connectionString)
    .then(()=> {
        console.log('Connect to the DB..')
        app.listen(port, console.log(`server is running on http://localhost:${port}`))
    })
    .catch((err)=>console.log(err))


//routes 
app.get('/todo', async(req,res)=> {
    const todos = await Todo.find();
    res.json(todos)
})

app.post('/todo/new', async(req,res)=> {
    const task = await Todo.create(req.body)
    res.status(201).json({task})
})

app.delete('/todo/delete/:id', async(req,res)=>{
    const result = await Todo.findByIdAndDelete(req.params.id)
    res.json(result)
})

