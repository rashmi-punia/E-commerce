import express from "express";
import {
  
} from "../controller/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controller/productController.js";

const router = express.Router();

router.get("/", getProducts);
router.route("/create").post(protect, createProduct )
router.route("/:id").get(getProductById).delete(protect,deleteProduct).put(protect, updateProduct)



export default router;
