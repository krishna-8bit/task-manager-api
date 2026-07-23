import Task from "../models/Task.js";

export async function createTask(req,res){
    try{
        const {title,description,priority,completed,deadline}=req.body;

        const newTask=new Task({
            title,
            description,
            priority,
            completed,
            deadline,
            user: req.user.id
        });

        await newTask.save();

        return res.status(201).json({
            message : "Task created successfully",
            task : newTask
        })
    }
    catch(error){
        return res.status(500).json({
            message : "Something went wrong",
            error : error.message
        });
    }
}

export async function getTasks(req,res){
    try{
        const tasks=await Task.find({user : req.user.id});

        return res.status(200).json({
            message : "Your list of tasks",
            tasks
        })
    }
    catch(error){
        return res.status(500).json({
            message : "Something went wrong",
            error : error.message
        });
    }
}


export async function updateTask(req,res){
    try{
        const id=req.params.id;
        const {title,description,priority,completed,deadline}=req.body;
        const existingTask=await Task.findOne({
            _id : id, 
            user : req.user.id
        });

        if(!existingTask){
            return res.status(404).json({
                message : "Task not found"
            });
        }
        existingTask.title = title;
        existingTask.description =description;
        existingTask.priority =priority;
        existingTask.completed =completed;
        existingTask.deadline =deadline;

        await existingTask.save();
        
        return res.status(200).json({
            message : "Task updated successfully",
            task : existingTask
        })
    }
    catch(error){
        return res.status(500).json({
            message : "Something went wrong",
            error : error.message
        });
    }
}

export async function deleteTask(req,res){
    try{
        const id=req.params.id;
        const deletedTask = await Task.findOneAndDelete({
            _id: id,
            user: req.user.id
        });

        if(!deletedTask){
            return res.status(404).json({
                message : "Task not found"
            });
        }

        return res.status(200).json({
            message : "Task deleted successfully"
        })
    }
    catch(error){
        return res.status(500).json({
            message : "Something went wrong",
            error : error.message
        });
    }
}