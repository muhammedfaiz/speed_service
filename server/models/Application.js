import mongoose from "mongoose";


const applicationSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true
    },
    designation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required:true
    },
    experience:{
        type:Number,
        required:true
    },
    proof:{
        type:String,
        required:true
    }
});


const Application = mongoose.model('Application',applicationSchema);
export default Application;