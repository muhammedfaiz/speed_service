import mongoose from 'mongoose';

const addressSchema = new mongoose.Schema({
    locality:{
        type:String,
    },
    place:{
        type:String,
    },
    state:{
        type:String,
    },
    country:{
        type:String,
    },
    pincode:{
        type:Number,
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    }
});

const Address = mongoose.model('Address', addressSchema);
export default Address;
