import express from "express";
import authRoutes from "./routes/auth.routes.js" 
import connectDb from "./config/db.js";
import dotenv from "dotenv"; 
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";

const port = 3000;

const app = express();

const envLoad = dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".env") });

// ⚠️ TEMPORARY DIAGNOSTIC — REMOVE AFTER DEBUGGING
// Reports why the DB connection fails (error text only, no credentials).
app.get("/dbcheck", async (req, res) => {
  const uri = process.env.MONGO_URI;
  const isStr = typeof uri === "string";
  const t0 = Date.now();
  const shape = {
    dotenvKeysInjected: Object.keys(envLoad.parsed ?? {}).length, // 0 => dashboard var overrides .env
    mongoUri: uri === undefined ? "undefined" : uri === "" ? "empty" : "string",
    length: isStr ? uri.length : null,
    startsWithMongodbSrv: isStr && uri.startsWith("mongodb+srv://"),
    hasWhitespaceOrQuote: isStr && (uri !== uri.trim() || /["']/.test(uri)),
    mainConnectionState: mongoose.connection.readyState, // 0=disconnected 1=connected 2=connecting
  };
  try {
    const conn = await mongoose.createConnection(uri, { serverSelectionTimeoutMS: 6000 }).asPromise();
    await conn.close();
    res.json({ ...shape, freshConnect: "OK", ms: Date.now() - t0 });
  } catch (e) {
    res.json({ ...shape, freshConnect: "FAILED", ms: Date.now() - t0, err: String(e.message).slice(0, 300) });
  }
});
// ⚠️ END TEMPORARY DIAGNOSTIC

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
