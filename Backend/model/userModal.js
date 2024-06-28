import mongoose from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: { type: String, required: true, default: "user" },
    mobile: {
      type: Number,
      required: true,
    },
    address: {
      type : String
      // type: mongoose.Schema.Types.ObjectId,
      // ref: "Address",
    },
  },
  {
    timeStamps: true,
  }
);

//To encrpt password
userSchema.pre('save' , async function(next){
    if(!this.isModified('password')){
next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
} )

// To Decrpt password 
userSchema.methods.matchPassword = async function (enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
}

const User = mongoose.model('User', userSchema);
export default User;