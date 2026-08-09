import Task from "../models/Task.js";
import ApiError from "../utils/ApiError.js";

export async function createTask(req,res){
        const {title,description,priority,completed,deadline}=req.body;
        
        // if(!title || typeof title!== "string"){
        //     // return res.status(400).json({
        //     //     message : "Title is empty"
        //     // });
        //     // const error = new Error("Title is empty");
        //     // error.statusCode =400;
        //     // throw error;
        //     throw new ApiError(400, "Title is empty");
        // }

        // const trimmedTitle = title.trim();

        // if(trimmedTitle.length<3){
        //     // return res.status(400).json({
        //     //     message : "Title is less than required length"
        //     // });
        //     // const error = new Error("Title is less than required length");
        //     // error.statusCode =400;
        //     // throw error;
        //     throw new ApiError(400, "Title is less than required length");
        // }
        
        // const validPriorities =["Low", "Medium", "High"];
        
        // if(!validPriorities.includes(priority)){
        //     // return res.status(400).json({
        //     //     message : "Your chosen priority doesn't exist"
        //     // });    
        //     // const error = new Error("Your chosen priority doesn't exist");
        //     // error.statusCode =400;
        //     // throw error;   
        //     throw new ApiError(400, "Your chosen priority doesn't exist");
        // }

        // if(description && description.length>500){
        //     // return res.status(400).json({
        //     //     message : "Description cannot exceed 500 characters"
        //     // })
        //     // const error = new Error("Description cannot exceed 500 characters");
        //     // error.statusCode =400;
        //     // throw error;
        //     throw new ApiError(400, "Description cannot exceed 500 characters");
        // }

        // if(deadline && isNaN(new Date(deadline).getTime())){
        //     // return res.status(400).json({
        //     //     messge: "Invalid deadline"
        //     // });
        //     // const error = new Error("Invalid deadline");
        //     // error.statusCode =400;
        //     // throw error;
        //     throw new ApiError(400, "Invalid deadline");
        // }
        
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

export async function getTasks(req,res){
        const page=Number(req.query.page) || 1;
        const limit=Number(req.query.limit) || 10;
        
        // if(page<1){
        //     // const error = new Error("Page number must be greater than 0");
        //     // error.statusCode =400;
        //     // throw error;
        //     throw new ApiError(400, "Page number must be greater than 0");
        // }

        // if(limit<1 || limit>100){
        //     // const error = new Error("Bad request");
        //     // error.statusCode =400;
        //     // throw error;
        //     throw new ApiError(400, "Limit must be between 1 and 100");
        // }
        const skip=(page-1)*limit;
        const { priority, completed, sort, search} =req.query;
        const filter={
            user: req.user.id
        };
        if(priority){
            // const validPriorities =["Low", "Medium", "High"];
            // if(!validPriorities.includes(priority)){
            //     // const error = new Error("Priority must be Low, medium or High");
            //     // error.statusCode =400;
            //     // throw error;   
            //     throw new ApiError(400, "Priority must be Low, medium or High");
            // }
            filter.priority=priority;
        }
        if(completed !== undefined){
            // if (completed !== "true" && completed !== "false") {
            //     // const error = new Error("Completed must be true or false.");
            //     // error.statusCode = 400;
            //     // throw error;
            //     throw new ApiError(400,"Completed must be True or False.")
            // }
            filter.completed=completed==="true";
        }
        const sortOption={};
        if(sort){
            if(sort[0]==="-"){
                const field=sort.substring(1);
                sortOption[field]=-1;
            }
            else{
                sortOption[sort]=1;
            }
        }
        if(search){
            filter.title= {
                $regex: search,
                $options: "i"
            }
        }

        const totalTasks=await Task.countDocuments(filter);
        const totalPages= Math.ceil(totalTasks/limit);
        const tasks=await Task.find(filter).sort(sortOption).skip(skip).limit(limit);
        
        return res.status(200).json({
            message : "Your list of tasks",
            page,
            limit,
            totalTasks,
            totalPages,
            tasks
        })
}

export async function updateTask(req,res){
        const {id}=req.params;
        const {title,description,priority,completed,deadline}=req.body;
        const existingTask=await Task.findOne({
            _id : id, 
            user : req.user.id
        });

        if(!existingTask){
            // return res.status(404).json({
            //     message : "Task not found"
            // });
            // const error = new Error("Task not found");
            // error.statusCode =404;
            // throw error;
            throw new ApiError(404, "Task not found");
        }
        
        if(title !== undefined){
            existingTask.title = title;
        }

        if(description !== undefined){
            existingTask.description = description;
        }

        if(priority !== undefined){
            existingTask.priority = priority;
        }

        if(completed !== undefined){
            existingTask.completed = completed;
        }

        if(deadline !== undefined){
            existingTask.deadline = deadline;
        }


        await existingTask.save();
        
        return res.status(200).json({
            message : "Task updated successfully",
            task : existingTask
        })
}

export async function deleteTask(req,res){
        const {id}=req.params;
        const deletedTask = await Task.findOneAndDelete({
            _id: id,
            user: req.user.id
        });

        if(!deletedTask){
            // return res.status(404).json({
            //     message : "Task not found"
            // });
            // const error = new Error("Task not found");
            // error.statusCode =404;
            // throw error;
            throw new ApiError(404, "Task not found");
        }

        return res.status(200).json({
            message : "Task deleted successfully"
        })
}