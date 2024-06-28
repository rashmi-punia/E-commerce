import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import path from "path"
import fs from "fs"


import userRoutes from "./routes/userRoute.js"
import productRoutes from "./routes/productRoute.js"
import cartRoutes from "./routes/cartRouter.js"
import updateRoutes from "./routes/updateRoutes.js"
import { errorHandler,notFound } from "./middleware/errorMiddleware.js";

const app =express();

app.use(cors());
app.use(express.json())
dotenv.config()

connectDB()
// const __dirname = path.resolve();
// const uploadDir = path.join(__dirname, "uploads");

// if (!fs.existsSync(uploadDir)) {
//   fs.mkdirSync(uploadDir);
// }



// app.use("/api/upload", updateRoutes);
// app.use("/uploads", express.static(path.join(__dirname, "/uploads")));



app.use("/api/users" ,userRoutes)
app.use('/api/products', productRoutes)
app.use('/api/cart', cartRoutes)


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 7000;
app.listen(PORT, ()=>{
    console.log(`ecoomerce pi on ${PORT}`);
})



