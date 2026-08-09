import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema=new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true
    },
    email : {
        type : String,
        lowercase : true,
        unique : true,
        required : true,
        trim : true
    },
    password : {
        type : String,
        minlength : 8,
        required : true
    }
});

userSchema.pre("save",async function(){
    if(!this.isModified("password")){
        return;
    }

    this.password = await bcrypt.hash(this.password,10);
});


const User=mongoose.model("User",userSchema);
export default User;