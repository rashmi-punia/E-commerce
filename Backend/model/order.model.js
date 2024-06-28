import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  // products: [
  //   {
  //     product: {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: "Product",
  //       required: true,
  //     },
  //     quantity: {
  //       type: Number,
  //       required: true,
  //     },
  //   },
  // ],
  cart : {
    type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Cart' 
  },
  address: {
    type: mongoose.Schema.Types.ObjectId,
    ref : "Address",
    required : true
  },
  paymentStatus : {
    type :String,
    required : true,
    enum : ['PENDING','COMPLETED','FAILED'],
    default : 'PENDING'
  },
  orderStatus : {
    type : String,
    required : true,
    enum : ['PROCESSING','SHIPPED','DELIVERED','CANCELLED'],
    default : 'PROCESSING'
  },
  totalPrice : {
    type :Number,
    required : true
  },
},
{
    timestamps : true
});


const Order = mongoose.model("Order", orderSchema);

export default Order;
