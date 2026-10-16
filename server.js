import express from "express";
import authRoutes from "./routes/auth.routes.js" 
import connectDb from "./config/db.js";
import dotenv from "dotenv"; 
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const port = 3000;

const app = express();

// ⚠️ TEMPORARY DEBUG ROUTE — REMOVE AFTER VERIFYING
// This confirms .env is being loaded without exposing the actual URI.
app.get("/debug", (req, res) => {
  res.json({ dotenvLoaded: !!process.env.MONGO_URI });
});

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
