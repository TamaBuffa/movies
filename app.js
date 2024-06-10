require("dotenv").config();
const express = require("express");
const morgan = require('morgan');
const dbConnect= require ("./config/mongo");
const port=process.env.PORT || 3000
const app = express();
app.use (express.json());
app.disable('etag');

//Configuración global de CORS para permitir todas las solicitudes desde cualquier origen
const cors=require ("cors");
app.use(cors());

app.use(morgan('combined'));

//Invocamos a las rutas
app.use("/api",require("./routes"));


app.listen(port,() =>{
  console.log(`http://localhost:${port}`);
});

dbConnect();