import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    min: [1, "wrong min discount"],
    max: [99, "wrong max discount"],
    default: 0,
  },
  discountPrice: { type: Number },

  category: {
    type: String,
    required: true,
    
  },
  seller:{
    type : String,
    required : true
  },
  
  brand: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  colors: { type: [mongoose.Schema.Types.Mixed] },
  sizes: { type: [mongoose.Schema.Types.Mixed] },
  // ratings: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Rating",
  //     required: true,
  //   },
  // ],
  // reviews: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: "Review",
  //     required: true,
  //   },
  // ],
  ratings: {
    type: Number,
    min: 0,
    max: 5,
    required: true,
  },
  reviews: {
    type: Number,
    required: true,
  },
  isFreeDelivery: {
    type: Boolean,
    required: true,
  },

  deliveryCharge: {
    type: Number,
    default: function () {
      this.isFreeDelivery ? null : 0;
    },
  },

  // category: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required : true,
  //   ref: "Category",
  // },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },

  createdAt: {
    type: Date,
    default: Date.now(),
    immutable: true,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
