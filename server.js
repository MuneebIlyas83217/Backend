import express from "express";
import authRoutes from "./routes/auth.routes.js" 
import connectDb from "./config/db.js";
import dotenv from "dotenv"; 
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const port = 3000;

const app = express();

const envLoad = dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".env") });

// ⚠️ TEMPORARY DIAGNOSTIC ROUTE — REMOVE AFTER DEBUGGING
// Reports only the SHAPE of MONGO_URI (scheme, length, flags) — never the value/credentials.
app.get("/debug", (req, res) => {
  const v = process.env.MONGO_URI;
  const isStr = typeof v === "string";
  const schemeMatch = isStr ? v.match(/^([a-zA-Z][a-zA-Z0-9+.-]*):\/\//) : null;
  res.json({
    vercel: !!process.env.VERCEL,
    nodeEnv: process.env.NODE_ENV ?? null,
    dotenvFileFound: !envLoad.error,
    dotenvKeysInjected: Object.keys(envLoad.parsed ?? {}).length,
    // Which related env var names exist (names only, no values)
    relatedEnvNames: ["MONGO_URI", "MONGODB_URI", "MONGO_URL", "DATABASE_URL"].filter(
      (k) => k in process.env
    ),
    mongoUri: v === undefined ? "undefined" : v === "" ? "empty" : "string",
    length: isStr ? v.length : null,
    scheme: schemeMatch ? schemeMatch[1] : null, // e.g. "mongodb+srv" or null
    startsWithMongodbSrv: isStr && v.startsWith("mongodb+srv://"),
    hasSchemeAnywhere: isStr && /mongodb\+srv:\/\/|mongodb:\/\//.test(v),
    hasLeadingTrailingWhitespace: isStr && v !== v.trim(),
    hasNewlineOrTab: isStr && /[\r\n\t]/.test(v),
    hasQuoteChar: isStr && /^["']|["']$/.test(v),
    hasAtSign: isStr && v.includes("@"),
    hasColonSlashSlash: isStr && v.includes("://"),
  });
});
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
