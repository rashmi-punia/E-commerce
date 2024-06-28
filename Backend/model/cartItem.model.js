import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
    productId : {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref : "Product"
    },
    quantity : {
        type : Number,
        required : true
    },
    price : {
        type : Number,
        required : true
    },

},{
    timestamps : true
})

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;
