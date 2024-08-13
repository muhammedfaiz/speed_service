import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        item: {
          type: mongoose.Types.ObjectId,
          ref: "Service",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price:{
            type: Number,
            required: true,
        },
        totalPrice:{
            type: Number,
            required: true,
        }
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    address: {
      type: mongoose.Types.ObjectId,
      ref: "Address",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["Pending", "Completed", "Cancelled","Commited"],
      default: "Pending",
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["cod", "paypal"],
    },
    captureId:{
      type:String,
      default:null
    },
    category:{
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    employee:{
      type: mongoose.Types.ObjectId,
      ref: "Employee",
      default: null,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;
