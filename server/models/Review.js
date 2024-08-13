import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    comment:{
        type:String,
        required:true
    },
    service:{
        type: mongoose.Types.ObjectId,
        ref:'Service',
        required:true
    }
},{timestamps:true});

const Review = mongoose.model("Review",reviewSchema);
export default Review;