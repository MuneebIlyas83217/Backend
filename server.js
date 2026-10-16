import express from "express";
import authRoutes from "./routes/auth.routes.js"
import connectDb from "./config/db.js";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const port = 3000;

const app = express();

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".env") });
connectDb();
app.use(express.json())
app.use(cors())
app.use("/auth",authRoutes)
app.get("/get",(req,res)=>{
    res.send("getting")
})

app.listen(port, ()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})