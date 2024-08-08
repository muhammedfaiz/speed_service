import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    house:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    pincode:{
        type:Number,
        required:true
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
});

const Address = mongoose.model('Address', addressSchema);
export default Address;
