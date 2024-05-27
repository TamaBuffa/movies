require("dotenv").config();
const express = require("express");
const dbConnect= require ("./config/mongo");
const port=process.env.PORT || 3000
const app = express();
app.use (express.json());
app.use (express.static("storage"));


const cors=require ("cors");
app.use(cors());


//Invocamos a las rutas
app.use("/api",require("./routes"));


app.listen(port,() =>{
  console.log(`http://localhost:${port}`);
});

dbConnect();