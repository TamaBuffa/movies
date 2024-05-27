const mongoose = require ("mongoose")

const movieSchema = new mongoose.Schema(
    {   
        id_user: {
            type: String, 
            required: true,
            unique: true
        },
        //Título de la película
        title:{
            type:String,
            required: true,
            unique:true
        },
        // Sinopsis o descripción
        synopsis:{
            type: String,
            required: true
        },
        //Año de lanzamiento de la película.
        release_year:{
            type: Number,
            required: true
        },
        //Duración de la película en minutos //
        runtime:{
            type: String,
            required: true
        },
        //URL del póster de la película.
        poster_url: {
            type: String,
            validate:{
                validator:(req)=>{ //validacion para cuando la URL no sea URL
                    return true
                },
                message:"ERROR_URL",
            },
            required: true,
            unique:true
        },
        // Trailer de la película
        trailer:{
            type: String,  
            validate:{
                validator:(req)=>{ //validacion para cuando la URL no sea URL
                    return true
                },
                message:"ERROR_URL",
            },
        },
    },
        
        {
            timestamps:true //createdAt/updateAt
        }
  );
    
  module.exports = mongoose.model("movie", movieSchema )

