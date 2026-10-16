import express from "express";
import authRoutes from "./routes/auth.routes.js"
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";

const port = 3000;

const app = express();

dotenv.config();
connectDb();
app.use(express.json())
app.use(cors())
app.use("/auth",authRoutes)

app.listen(port, ()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})