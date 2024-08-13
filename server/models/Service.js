import mongoose from 'mongoose';


const serviceSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:mongoose.Types.ObjectId,
        ref:"Category",
        required:true,
    },
    image:{
        type:String,
        required:true
    },
    employees:{
        type:Array,
        required:true,
    },
},{
    timestamps:true,
}
);

const Service = mongoose.model("Service",serviceSchema);
export default Service;