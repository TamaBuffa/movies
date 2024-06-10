// Definición del esquema y modelo de mongoose
const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
    user_id: {
        type: String, 
        required: true,
    },
    //Id de TMBD
    idTmbd: {
        type: Number, 
        required: true,
    },
    //Título de la película
    title: {
        type: String,
        required: true,
    },
    poster_url: {
        type: String,
        required: true
    },
    // Sinopsis o descripción
    overview: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    //Año de lanzamiento de la película.
    releaseDate: {
        type: String,
        required: true
    },
    //Duración de la película en minutos
    runtime: {
        type: String,
        required: true
    },
});


// Crear índices compuestos únicos para user_id e idTmbd, y user_id y title
movieSchema.index({ user_id: 1, idTmbd: 1 }, { unique: true });
movieSchema.index({ user_id: 1, title: 1 }, { unique: true });


module.exports = mongoose.model("movie", movieSchema );