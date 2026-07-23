import mongoose from "mongoose";
const taskSchema =new mongoose.Schema({
    title : {
        type: String,
        required: true,
        trim: true
    },
    priority : String,
    description : String,
    completed : {
        type : Boolean,
        default : false
    },
    deadline : Date,
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    }
});

const Task=mongoose.model("Task",taskSchema);
export default Task;