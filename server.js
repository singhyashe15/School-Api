import express from "express";
import apiRouter from "./routes/route.js";
import schoolTable from "./models/schoolTable.js";
import pool from "./config/db.js";

const app = express();

const PORT = 3000;

app.use(express.json());

pool.getConnection()
  .then(() => console.log("✅ Connected to MySQL"))
  .catch((err) => console.error("❌ Connection error:", err.message));


// table
schoolTable();

// api endpoints
app.use('/',apiRouter);



// listen the port
app.listen(PORT,()=>{
  console.log("You are know connected");
})