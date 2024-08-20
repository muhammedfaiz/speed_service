import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    sender:{
        type:mongoose.Types.ObjectId,
        ref:'User'||"Employee",
        required:true
    },
    receiver:{
        type:mongoose.Types.ObjectId,
        ref:'User'||"Employee",
        required:true
    },
    message:{
        type:String,
        required:true
    }
},{timestamps:true});

const Message =  mongoose.model('Message', messageSchema);

export default Message;

