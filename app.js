const express = require("express");
const morgan = require("morgan");

const app = express();  
app.use(morgan('dev'));
app.use(express.json());
// in memory storage for task
let tasks=[];
app.get('/',(req,res)=>{
    res.json(tasks);
})

app.post('/tasks',(req,res)=>{
    tasks.push(req.body);
    res.send({message:"task added",tasks})
})

app.get('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    const task =tasks.find(task=>task.id===id);
    if(!task){
        res.send("task not found");
    }else{
        res.json(task)
    }
})

app.put('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    const updateTask= req.body;
    const index =tasks.findIndex((tasks)=>tasks.id===id);
    if(index===-1){
        res.send("task not found")
    }else{
        tasks.splice(index,1,updateTask);
        //tasks[index] =updatedTask
        res.json(tasks)
    }
})

app.delete('/tasks/:id',(req,res)=>{
    const id = req.params.id;
    const index =tasks.findIndex((tasks)=>tasks.id===id);
    if(index===-1){
        res.send("task not found")
    }else{
        tasks.splice(index,1);
        //tasks[index] =updatedTask
        res.json(tasks);
    }
})

app.listen(4000,(req,res)=>{
    console.log("port is up")
})