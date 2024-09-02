//Server.js
const express = require('express')

const mongoose = require('mongoose')

const cors = require('cors')
const app = express() 
const PORT = process.env.PORT || 5000;
//middleware to parse JSON()
app.use(express.json())

app.use(cors())
//middle is used to handle and manage request and responses as they passes through different level of routs

//server routes
// const itemRoutes = require('../Backend/itemRoutes')
// app.use('/api',itemRoutes)


//MongoDB Connection
const url = "mongodb+srv://computingthamizhan:HxzNLJQgnMHX16im@todo.addda.mongodb.net/?retryWrites=true&w=majority&appName=Todo"
const uri = "mongodb://localhost:27017/crud"
mongoose.connect(url,{
    // useNewUrlParser:true,
    // useUnifiedTopology:true,
})
.then(()=>console.log('Connected to MongoDB'))
.catch(err=>console.log(err))
//Creating schema
const todoSchema = new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    description:String,
})
//creating model
const todoModel = mongoose.model('Todo',todoSchema);

//Password for mondoDB connection string : HxzNLJQgnMHX16im
//create a  new todo item
app.post('/todos', async (req, res)=>{
    const {title,description} = req.body;
    try {
        const newTodo =  new todoModel({title, description})
       await  newTodo.save();
       res.status(201).json(newTodo);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:error.message
        })
    }
  
})
//get items from database
app.get('/todos', async(req, res)=>{
    try {
        const todos = await todoModel.find();
        res.json(todos)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:error.message
        })
    }
})
//get item by id
app.get('/todos/:id', async (req, res)=>{
    try{
        const id = req.params.id;
        const itemById = await todoModel.findById(id)
        res.json(itemById)
    }catch(error){
        console.log(error)
        res.status(505).json({
            message:error.message
        })
    }
})
//updating items

app.put('/todos/:id', async(req, res)=>{
    try {
        const{title, description} = req.body;
        const id = req.params.id;
        const updatedItem  = await todoModel.findByIdAndUpdate(
            id,
            {title, description},
            {
                new:true
            }
        )
        if(!updatedItem){
            return res.status(404).json({
                message:"Todo Not found"
            })
        }
        res.json(updatedItem)
        
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
   
})

//deleting an item
app.delete('/todos/:id', async(req, res)=>{
    try{
        const id = req.params.id;
        await todoModel.findByIdAndDelete(id)
        res.status(201).json({
            message:"Item has been deleted"
        }).end()
    }catch(error){
        console.log(error)
        res.status(500).json({message:error.message})
    }
})
app.get('/', (req, res)=>{
    res.send('Hello from the backend It means server is running')
})
app.listen(PORT, ()=>{
    console.log(`App running on http://localhost:${PORT}`)
})