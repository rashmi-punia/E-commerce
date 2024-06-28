import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  label: { type: String, required: true, unique: true },
  value: { type: String, required: true, unique: true },
});

const Category = mongoose.model("Category", categorySchema)

export default Category