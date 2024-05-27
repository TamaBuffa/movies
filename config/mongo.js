
//Declaracion de paquete de Mongoose
const mongoose = require("mongoose");

//Es una funcion, que nos devuelve, una funcion callback.
const dbConnect = async () => {
    try {
        const DB_URI = process.env.DB_URI;
        await mongoose.connect(DB_URI); 
        console.log('*** CONEXION CORRECTA ***'); 
        
    } catch (error) {
        console.error('*** ERROR DE CONEXION ***', error);
    }
};

//Se va a exportar, para poder ser utilizado en otras partes
module.exports =dbConnect
