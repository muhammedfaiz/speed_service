import mongoose from 'mongoose';


const cartSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    items:[{
        item:{
            type:mongoose.Types.ObjectId,
            ref:'Service',
            required:true
        },
        quantity:{
            type:Number,
            required:true
        }
    }],
    totalAmount:{
        type:Number,
        required:true
    },
    discount:{
        type:Number,
        default:0,
    }
});

const Cart = mongoose.model("Cart",cartSchema);

export default Cart;