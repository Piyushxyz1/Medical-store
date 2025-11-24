import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import productRoutes from "./routes/productRoutes.js";
import { sql } from "./config/db.js";
import { aj } from "./lib/arcjet.js";
import path from "path"

dotenv.config()
const app = express();
const PORT = process.env.PORT
const __dirname = path.resolve()
app.use(express.json());
app.use(cors())
app.use(
  helmet({
    contentSecurityPolicy: false,
  }))
app.use(morgan("dev"))


app.use(async(req,res,next)=>{

try {
    const decision =  await aj.protect(req,{
requested: 1 //speciefies that each request consume 1 token

    });
    if(decision.isDenied()){
       if (decision.reason.isRateLimit()) {
      res.status(429).json({ "error": "too many request" });
    } else if (decision.reason.isBot()) {
      res.status(403).json({ "error": "Bot Access in Denied"});
    } else {
      res.status(403). json({ "error": "forbidden"});
     
    }
    return
    }

    // check for spoofed bots
    if(decision.results.some((result)=>result.reason.isBot()&& result.reason.isSpoofed())){

        res.status(403).json({error:"Spoofed bot Detected"});
        return;
    }
    next()
} catch (error) {
    console.log(error)
    res.status(500).json({error:error.message,message:"Internal Server Error"})
}

})


app.use("/api/products",productRoutes);

if (process.env.NODE_ENV === "production") {
  // server our react app
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("/*splat", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}


async function initDB(){

try {
    await sql`
    CREATE TABLE IF NOT EXISTS products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    `
    console.log("data intialized succesfully")
} catch (error) {
    console.log("error in initializing db",error)
}

}

initDB().then(()=>{
    app.listen(PORT,()=>{
    console.log("server is running on port 5000")
    })
})




