const { matchedData } = require("express-validator");
const { movieModel } = require ("../models");
const {handleHttpError} =require("../utils/handleError");
const axios = require('axios');
const { release } = require("os");

/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */

const getItems = async(req,res) =>{
    try {   
        // Extraer el token del encabezado    
    const token = req.headers['authorization' ];

        // Validar que el token exista
        if (!token) {
            return handleHttpError(res, 'TOKEN VACIO', 400);
        }

         // Realizar solicitud para validar el token
         const response = await axios.get(`${process.env.USER_BACKEND_URL}/me`, {
            headers: { 'Authorization': token }
        });

        // Extraer el ID del usuario de la respuesta
        const usuarioId = response.data.user_id;

        // Validar que el usuarioId exista
        if (!usuarioId) {
            return handleHttpError(res, 'EL USUARIO NO EXISTE', 400);
         }

        // Validar que usuarioId no esté vacío
        if (usuarioId.trim() === "") {
            return handleHttpError(res, 'ID DE USUARIO VACIO', 400);
        }
        
       // Buscar todas las películas del usuario en la base de datos
       const data = await movieModel.find({ user_id: usuarioId });

        // Verificar si no existen películas para el usuario
        if (data.length === 0) {
            return res.status(204).set('Message', 'NO CONTENT').send(); // HTTP 204 No Content
        }


        // Mapear los datos para enviar solo los campos deseados (array)
        const formattedData = data.map(data => ({
            id: data._id,
            user_id: data.user_id,
            idTmbd: data.idTmbd,
            title: data.title,
            poster_url: data.poster_url,
            overview: data.overview,
            comment: data.comment,
            releaseDate: data.releaseDate,
            runtime: data.runtime
            }));
             
            // Enviar la respuesta con las películas encontradas
            res.status(200).set('Message', 'OK').json(formattedData);

      } catch (e) {
        if (e.response && e.response.status === 401) {
            return handleHttpError(res, 'TOKEN INVALIDO', 401);
        }
        console.log(e);
        handleHttpError(res, 'BAD REQUEST', 400);
    }
};


/*
//Buscar todas las películas de todos los usuarios en la base de datos

const getAllItems = async(req,res) =>{
    try {   
        const data = await movieModel.find({});
        res.status(200).json(data);
    } catch (e) {
    
        if (e.response && e.response.status === 401) {
        return handleHttpError(res, 'TOKEN INVALIDO', 401);
    }
    console.log(e);
    handleHttpError(res, 'BAD REQUEST', 400);
    }
};

*/

/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem = async (req, res) => {
    console.log("getItem function called");
    try {
        // Extraer el token del encabezado
        const token = req.headers['authorization'];
        
        console.log(token)
        // Validar que el token exista
        if (!token) {
            return handleHttpError(res, 'TOKEN VACIO', 400);
        }

        // Realizar solicitud para validar el token
        const response = await axios.get(`${process.env.USER_BACKEND_URL}/me`, {
            headers: { 'Authorization': token }
        });

        // Extraer el ID del usuario de la respuesta
        const usuarioId = response.data.user_id;
        
        console.log(usuarioId)

        // Validar que el usuarioId exista
        if (!usuarioId) {
            return handleHttpError(res, 'EL USUARIO NO EXISTE', 400);
        }

        // Validar que usuarioId no esté vacío
        if (usuarioId.trim() === "") {
            return handleHttpError(res, 'ID DE USUARIO VACIO', 400);
        }

        // Extraer el _id del cuerpo de la solicitud
        const _id  = req.params.id;
        console.log("Me llego el ID: ", _id)
        
        // Buscar la película por user_id y idTmbd
        const data = await movieModel.findOne({ user_id: usuarioId, _id: _id });
       
            if (!data) {
               return handleHttpError(res, "NOT FOUND", 404);
           }

                        
           // Enviar la respuesta con el favorito guardado
            console.log(data);
            console.log(res.status);
            console.log(res.send);
            res.status(200).json({
                id: data._id,
                user_id: data.user_id,
                idTmbd: data.idTmbd,
                title: data.title,
                poster_url: data.poster_url,
                overview: data.overview,
                comment: data.comment,
                releaseDate: data.releaseDate,
                runtime: data.runtime
            });

    } catch (e) {
        console.log(e);
        handleHttpError(res, 'BAD REQUEST', 400);
    }
};


/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */

const createItem = async (req, res) => {
    try {
        const token = req.headers['authorization'];

        if (!token) {
            return handleHttpError(res, 'TOKEN VACIO', 400);
        }

        const response = await axios.get(`${process.env.USER_BACKEND_URL}/me`, {
            headers: { 'Authorization': token }
        });

        const usuarioId = response.data.user_id;

        if (!usuarioId) {
            return handleHttpError(res, 'EL USUARIO NO EXISTE', 404);
        }

        if (usuarioId.trim() === "") {
            return handleHttpError(res, 'ID DE USUARIO VACIO', 400);
        }

        const body = req.body;

        console.log("body", body);

        // Agregar el id del usuario al cuerpo
        body.user_id = usuarioId;

        // Verificar si ya existe una película para ese usuario por idTmbd
        const existeMovieByIdTmbd = await movieModel.findOne({ user_id: usuarioId, idTmbd: req.body.idTmbd });
        if (existeMovieByIdTmbd) {
            return handleHttpError(res, 'PELICULA EXISTE PARA EL USUARIO POR IDTMBD', 400);
        }

        // Verificar si ya existe una película para ese usuario por título
        const existeMovieByTitle = await movieModel.findOne({ user_id: usuarioId, title: req.body.title });
        if (existeMovieByTitle) {
            return handleHttpError(res, 'PELICULA EXISTE PARA EL USUARIO POR TITULO', 400);
        }

        // Guardar el favorito en la base de datos
        const data = await movieModel.create(body);

        // Enviar la respuesta con el favorito guardado
        res.status(201).set('Message', 'CREATED').send({
            id: data._id,
            user_id: data.user_id,
            idTmbd: data.idTmbd,
            title: data.title,
            poster_url: data.poster_url,
            overview: data.overview,
            comment: data.comment,
            releaseDate: data.releaseDate,
            runtime: data.runtime
        });

    } catch (e) {
        if (e.response && e.response.status === 401) {
            return handleHttpError(res, 'TOKEN INVALIDO', 401);
        }
        console.log(e);
        handleHttpError(res, 'BAD REQUEST', 400);
    }
};

/**
 * Actualizar el comentario de una película
 * @param {*} req 
 * @param {*} res 
 */
const updateComment = async (req, res) => {
    try {
        // Extraer el token del encabezado
        const token = req.headers['authorization'];

        // Validar que el token exista
        if (!token) {
            return handleHttpError(res, 'TOKEN VACIO', 400);
        }

        // Realizar solicitud para validar el token y obtener el usuario
        const response = await axios.get(`${process.env.USER_BACKEND_URL}/me`, {
            headers: { 'Authorization': token }
        });

        // Extraer el ID del usuario de la respuesta
        const usuarioId = response.data.user_id;

        // Validar que el usuarioId exista
        if (!usuarioId) {
            return handleHttpError(res, 'EL USUARIO NO EXISTE', 400);
        }

        // Validar que usuarioId no esté vacío
        if (usuarioId.trim() === "") {
            return handleHttpError(res, 'ID DE USUARIO VACIO', 400);
        }

        // Extraer el id de la película a actualizar
        const _id  = req.params.id;

        // Extraer el nuevo comentario del cuerpo de la solicitud
        const comment = req.body.comment;

        // Validar que se proporcionó un comentario válido
        if (!comment) {
            return handleHttpError(res, 'COMENTARIO VACIO', 400);
        }

        // Buscar la película por user_id y _id
        const data = await movieModel.findOne({ user_id: usuarioId, _id: _id });

        // Validar que la película existe
        if (!data) {
            return handleHttpError(res, 'PELICULA NO ENCONTRADA', 404);
        }

        // Actualizar el comentario de la película
        data.comment = comment;

        // Guardar los cambios en la base de datos
        await data.save();

        // Enviar la respuesta con la película actualizada
        res.status(200).set('Message', 'OK').json({
            id: data._id,
            user_id: data.user_id,
            idTmbd: data.idTmbd,
            title: data.title,
            poster_url: data.poster_url,
            overview: data.overview,
            comment: data.comment,
            releaseDate: data.releaseDate,
            runtime: data.runtime
        });

    } catch (error) {
        console.error(error);
        handleHttpError(res, 'BAD REQUEST', 400);
    }
};


/**
 * Eliminar una película
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = async (req, res) => {
    try {
        // Extraer el token del encabezado
        const token = req.headers['authorization'];

        // Validar que el token exista
        if (!token) {
            return handleHttpError(res, 'TOKEN VACIO', 400);
        }

        // Realizar solicitud para validar el token y obtener el usuario
        const response = await axios.get(`${process.env.USER_BACKEND_URL}/me`, {
            headers: { 'Authorization': token }
        });

        // Extraer el ID del usuario de la respuesta
        const usuarioId = response.data.user_id;

         // Validar que el usuarioId exista
         if (!usuarioId) {
            return handleHttpError(res, 'EL USUARIO NO EXISTE', 400);
        }

        // Validar que usuarioId no esté vacío
        if (usuarioId.trim() === "") {
            return handleHttpError(res, 'ID DE USUARIO VACIO', 400);
        }
        // Extraer el ID de la película a eliminar de los parámetros de la URL
        const _id = req.params.id;

        // Buscar la película en la base de datos por el ID de la película y el ID del usuario
        const data = await movieModel.findByIdAndDelete({ _id: _id, user_id: usuarioId });


        // Si la película no existe, devolver un error
        if (!data) {
            return handleHttpError(res, 'PELICULA NO ENCONTRADA', 404);
        }

       
        // Enviar una respuesta de éxito
        res.status(200).json({ message: 'PELICULA ELIMINADA EXITOSAMENTE' });
    } catch (error) {
        console.error(error);
        handleHttpError(res, 'BAD REQUEST', 400);
    }
};

/*BORRAR TODAS las peliculas del usuario*/
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */

const deleteAllItemsUser = async (req, res) => {

    try {
        const token = req.headers['authorization'];
        if (!token) {
            handleHttpError(res, 'TOKEN VACIO', 400);
            return null;
        }

        const response = await axios.get(`${process.env.USER_BACKEND_URL}/me`, {
            headers: { 'Authorization': token }
        });

        const usuarioId = response.data.user_id;

          // Validar que el usuarioId exista
          if (!usuarioId) {
            return handleHttpError(res, 'EL USUARIO NO EXISTE', 400);
        }

        // Validar que usuarioId no esté vacío
        if (usuarioId.trim() === "") {
            return handleHttpError(res, 'ID DE USUARIO VACIO', 400);
        }

        // Borrar todas las películas del usuario
        await movieModel.deleteMany({ user_id: usuarioId });

        res.status(204).send(); // HTTP 204 No Content

    } catch (error) {
        console.error(error);
        handleHttpError(res, 'BAD REQUEST', 400);
    }
};


/*BORRAR TODO!!!*/
/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const deleteAll = async (req, res) => {
    try {
        // Eliminar todos los registros en la colección
        const result = await movieModel.deleteMany({});

        if (result.deletedCount === 0) {
            return handleHttpError(res, 'NOT FOUND', 404);
        }

        res.send({ message: 'All records deleted successfully' });
    } catch (e) {
        console.log(e);
        handleHttpError(res, 'BAD REQUEST', 400);
    }
};


module.exports= {getItems,getItem,createItem,updateComment,deleteAll,deleteItem,deleteAllItemsUser};