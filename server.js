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

connectDb().catch(() => {}); // eager boot attempt; failures are retried on the first request below
app.use(express.json())
app.use(cors())
// Await the DB connection (retries if the cold-start attempt failed) before serving
// DB routes — this prevents mongoose's 10s query-buffer timeout on cold starts.
app.use("/auth", async (req, res, next) => {
  try {
    await connectDb();
    next();
  } catch {
    res.status(500).json({ message: "Database unavailable" });
  }
});
app.use("/auth",authRoutes)
app.get("/get",(req,res)=>{
    res.send("getting")
})

app.listen(port, ()=>{
    console.log(`Server is running on port http://localhost:${port}`);
})
