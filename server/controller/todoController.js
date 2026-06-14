const Todo=require('../models/Todo.js');// import todo model

//get all todos for a user
exports.getAllTodos=async (req,res)=>{
    try {
        const {userId}=req.query;
        const todos=await Todo.find({userId});

        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({message:'Error fetching todos',error:error.message});
    }
}


//create todo
exports.createTodo=async (req,res)=>{
    try {
        const {task}=req.body;
        const {userId}=req.query;
        
        //create new todo
        const todo=new Todo({
            task,
            userId
        })
        await todo.save();
        res.status(201).json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error creating todo",error:error.message});
    }
}

//update todo
exports.updateTodo=async (req,res)=>{
    try {
        const {id}=req.params;
        const {task,completed,complete_time}=req.body;

        const todo=await Todo.findByIdAndUpdate(
            id,
            {task,complete_time,completed},
            {new:true} //return updated todo
        )
        return  res.status(200).json(todo);
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Error updating todo",error:error.message});
    }
}

//delete todo
exports.deleteTodo=async(req,res)=>{
    try{
        const {id}=req.params;
        await Todo.findOneAndDelete({_id:id});
        res.status(200).json({message:"Todo deleted successfully"});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error deleting todo",error:error.message});
    }
}


//delete all todo
exports.deleteAllTodo=async(req,res)=>{
    try{
        const {userId}=req.query;
        await Todo.deleteMany({userId});
        res.status(200).json({message:"All Todo deleted successfully",status:200});
    }catch(error){
        console.log(error);
        res.status(500).json({message:"Error deleting todo",error:error.message});
    }
}

