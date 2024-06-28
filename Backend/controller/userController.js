import User from "../model/userModal.js";
import asyncHandler from "express-async-handler";
import { generateToken } from "../utils/generateToken.js"



export const registerUser = asyncHandler(async (req, res) => {
  const {firstName, lastName, password, mobile, email, address } = req.body;
  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }
  const user = await User.create({
   firstName,
   lastName,
   password,email,mobile,address
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      mobile : user.mobile,
      address : user.address,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Error Occured !!");
  }
});

export const authUser = asyncHandler(async(req,res)=>{
    const { email , password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.matchPassword(password))){
        res.json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: user.isAdmin,
          mobile: user.mobile,
          address: user.address,
          email: user.email,
          token: generateToken(user._id),
        });
    } else{
        res.status(400)
        throw new Error("Invalid email or password")
    }
});

export const updateUserProfile = asyncHandler(async(req,res) => {
    const user = await User.findById(req.user._id)
    if(user){
        user.firstName = req.body.firstName || user.firstName
        user.lastName = req.body.lastName || user.lastName
        user.email = req.body.email || user.email;
        user.mobile = req.body.mobile || user.mobile
        user.address = req.body.address || user.address

        if(req.body.password){
            user.password = req.body.password
        }

        const updatedUser = await user.save();

        res.json({
            _id : updatedUser._id,
            firstName : updatedUser.firstName,
            lastName : updatedUser.lastName,
            email : updatedUser.email,
            mobile : updatedUser.mobile,
            address:updatedUser.address,
            token : generateToken(updatedUser._id)
        })
    }else{
        res.status(404)
        throw new Error("user not Found")
    }
})