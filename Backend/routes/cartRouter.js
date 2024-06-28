import express from "express"
import { addItemToCart, removeItemFromCart, updateCartItemQty } from "../controller/cartController.js"
import { protect } from "../middleware/authMiddleware.js"
const router = express.Router()

// router.post('/add-item',protect, addItemToCart)
// router.delete('/:id',protect, removeItemFromCart )
// router.put('/:id',protect, updateCartItemQty)
// router.get(':id',protect, getCart)


router.route("/add-item").post(protect, addItemToCart);
router.route("/:id").delete(protect, removeItemFromCart);
router.route("/:id").put(protect, updateCartItemQty);


export default router