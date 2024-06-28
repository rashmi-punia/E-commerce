import asyncHandler from "express-async-handler";
import Cart from "../model/cart.model.js";
import CartItem from "../model/cartItem.model.js";
import Product from "../model/product.model.js";
import { updateProduct } from "./productController.js";


export const addItemToCart = asyncHandler(async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user._id
    const product = await Product.findById(productId)
    if(!product){
        return res.status(404).json({message : "Product not Found"})

    }
    const price = product.discountPrice
    //new cart item
    const cartItem = new CartItem({ productId, quantity, price });
    await cartItem.save();

    let cart = await Cart.findOne({user:userId});
    if (!cart) {
      cart = new Cart({user: userId, items: [cartItem] });
    } else {
      cart.items.push(cartItem);
    }

    await cart.save();
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export const removeItemFromCart = asyncHandler(async(req,res) => {
try{
    const {id: itemId} = req.params
    const userId = req.user._id

    await CartItem.findByIdAndDelete(itemId);
    let cart = await Cart.findOne({user : userId})
    if(!cart){
        return res.status(404).json({ message : "Cart not found"})
    }

    //remove item from cart items array
    cart.items = cart.items.filter((item) => item.toString() !== itemId)
    await cart.save();
    res.status(200).json({success: true, message : "Item removed from cart"})
}catch(error){
    res.status(500).json({ message : error.message})
}
})

export const updateCartItemQty = asyncHandler(async(req,res) =>{

    try{
        const {id : itemId} = req.params
        const {quantity} = req.body
        const userId = req.user._id
        //find cart item
        let cartItem = await CartItem.findById(itemId)
        if(!cartItem){
            return res.status(404).json({ message : "cartItem not found"})
        }

        cartItem.quantity  = quantity
        await cartItem.save()
        res.status(200).json(cartItem)
        }catch(error){
            res.status(500).json({ message: error.message })
        }
})
