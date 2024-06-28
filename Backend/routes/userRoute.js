import express from "express";
import { authUser, registerUser, updateUserProfile } from "../controller/userController.js";
import {protect} from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", authUser );
router.route("/profile").post(protect, updateUserProfile)


export default router;