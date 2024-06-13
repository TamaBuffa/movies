const axios = require('axios');
const { authenticateUser } = require("../middleware/authenticateUser");
const { movieModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");
const { formatMovieData } = require("../utils/formatMovieData");
const { formatSimpleMovieData } = require("../utils/formatSimpleMovieData");
const { verifyMovieExistence } = require("../utils/verifyMovieExistence");
const { release } = require("os");
// Expresión regular para validar el formato de ObjectId de MongoDB
const mongoIdRegex = /^[0-9a-fA-F]{24}$/;



const getItems = async (req, res) => {
    try {
       
        const usuarioId = req.usuarioId;//Obtiene el usuarioId del objeto req
        const titleQuery = req.query.title;//Obtiene el parámetro 'title' de la consulta (query) en la URL
        const filter = { user_id: usuarioId };
        if (titleQuery) {//regex utilizando la cadena contenida en la variable titleQuery
            console.log("query",titleQuery)
            console.log("filtertitle",filter.title)
            filter.title = { $regex: new RegExp(titleQuery, 'i') };//con el modificador 'i', indica búsqueda insensible a mayúsculas y minúsculas.
        }
        const data = await movieModel.find(filter);
        const formattedData = formatMovieData(data);
        return res.status(200).json(formattedData);
        //res.status(200).json(formattedData);

    } catch (e) {
        console.error(e);
        return handleHttpError(res, 'Consulta inválida', 400, 'La consulta es inválida');
    }
};

/**
 * Obtener detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    
    try {
        const usuarioId = req.usuarioId; // Obtener el usuarioId del middleware authenticateUser
        const _id = req.params.id; // Obtener el ID de la película desde los parámetros de la ruta
        
        // Validar el formato del _id con regex
        if (!mongoIdRegex.test(_id)) {
            return handleHttpError(res, 'El ID de película no es válido', 400, 'ID no válido');
        }
        
        const data = await movieModel.findOne({ user_id: usuarioId, _id });
        if (!data) {
            return handleHttpError(res, 'La película no se encuentra', 404, 'Pelicula no encontrada');
        }

         // Formato simplificado
        const simpleFormattedData = formatSimpleMovieData(data);
        return res.status(200).json(simpleFormattedData);

    } catch (e) {
        console.error(e);
        return handleHttpError(res, 'La consulta es inválida', 400, 'Consulta inválida');
    }
};


/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */

const createItem = async (req, res) => {
    
    try {
        const usuarioId = req.usuarioId; // Obtener el usuarioId del middleware authenticateUser
       
        const body = req.body;
        console.log("body",body);
        body.user_id = usuarioId;// Agregar el id del usuario al cuerpo
        const movieExists = await verifyMovieExistence(req, res); // Verificar si la película ya existe para el usuario
        if (movieExists) {
            return; // Si la película ya existe, la función verifyMovieExistence ya maneja la respuesta
        }
        const data = await movieModel.create(body); // Guardar el favorito en la base de datos
        // Formato simplificado
        const simpleFormattedData = formatSimpleMovieData(data);
        return res.status(201).json(simpleFormattedData);

    } catch (e) {
        console.error(e);
        return handleHttpError(res, 'La consulta es inválida', 400, 'Consulta inválida');
    }
 };
 
/**
 * Actualizar el comentario de una película
 * @param {*} req 
 * @param {*} res 
 */
const updateComment = async (req, res) => {
    try {
        const usuarioId = req.usuarioId; // Obtener el usuarioId del middleware authenticateUser
        const _id = req.params.id; // Extraer el id de la película a actualizar
        const comment = req.body.comment; // Extraer el nuevo comentario del cuerpo de la solicitud

        const data = await movieModel.findOne({ user_id: usuarioId, _id }); // Buscar la película por user_id y _id   
        if (!data) { // Validar que la película existe
            return handleHttpError(res, 'La película no se encuentra', 404, 'Película no encontrada');
        }

        if (!comment) { // Validar que se proporcionó un comentario válido
            return handleHttpError(res, 'El comentario está vacío', 400, 'Comentario vacío');
        }
        
        // Actualizar el comentario de la película
        data.comment = comment;
        await data.save(); // Guardar los cambios en la base de datos

        // Formato simplificado
        const simpleFormattedData = formatSimpleMovieData(data);
        return res.status(202).json(simpleFormattedData);

    } catch (error) {
        console.error(error);
        return handleHttpError(res, 'La consulta es inválida', 400, 'Consulta inválida');
    }
};

/**
 * Eliminar una película
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        
        const user_id = req.usuarioId; // Obtener el usuarioId del middleware authenticateUser
        const _id = req.params.id; // Obtener el ID de la película desde los parámetros de la ruta
    
        // Buscar la película en la base de datos por el ID de la película y el ID del usuario
        const data = await movieModel.findByIdAndDelete({ _id: _id, user_id: user_id });
        // Si la película no existe, devolver un error
        if (!data) {
            return handleHttpError(res, 'La película no se encuentra', 204, 'Película no encontrada');
        }
        // Enviar una respuesta de éxito
        return res.status(204).json({ message: 'La película fue eliminada exitosamente' })

    } catch (error) {
        console.error(error);
        return handleHttpError(res, 'Ocurrió un error inesperado', 500, 'Error inesperado');
    }
};


//BORRAR TODAS las peliculas del usuario/
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

const deleteAllItemsUser = async (req, res) => {
    try {
        const user_id = req.params.user_id;

        // Buscar todas las películas del usuario en la base de datos
        const data = await movieModel.find({ user_id: user_id });

    
        // Borrar todas las películas del usuario
        await movieModel.deleteMany({ user_id: user_id });

        // Enviar respuesta con código de estado 204 (No Content)
        return res.status(204).send();

    } catch (error) {
        console.error(error);
        return handleHttpError(res, 'Ocurrió un error inesperado', 500, 'Error inesperado');
    }
};


module.exports = { getItems, getItem,createItem,updateComment,deleteItem,deleteAllItemsUser };


