import mongoose from "mongoose";
const taskSchema =new mongoose.Schema({
    title : {
        type: String,
        required: true,
        trim: true,
        minlength : 3,
        maxlength : 100
    },
    priority : {
        type : String,
        enum : ["Low", "Medium", "High"]
    },
    description : {
        type : String,
        maxlength :500
    },
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
},{
    timestamps: true
});

const Task=mongoose.model("Task",taskSchema);
export default Task;