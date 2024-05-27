const { matchedData } = require("express-validator");
const { movieModel } = require ("../models");
const {handleHttpError} =require("../utils/handleError");


/**
 * Obtener lista de la base de datos
 * @param {*} req 
 * @param {*} res 
 */
const getItems = async(req,res) =>{
    try {
        const data = await movieModel.find({})//que busque todo
        res.status(200).json(data);
    }catch(e){
        handleHttpError(res, 'BAD REQUEST',400)
    }
};



/**
 * Obtener un detalle
 * @param {*} req 
 * @param {*} res 
 */
const getItem =async(req,res) =>{;
    try{
        req=matchedData(req);
        const {id_user}=req;
        const data = await movieModel.findOne({ id_user });/*Buscar por id_user*/
        if (!data) {
            return handleHttpError(res, "NOT FOUND", 404);
        }
        res.send({ data });
    }catch(e){
        handleHttpError(res, 'BAD REQUEST',400)
    }
};


/**
 * Insertar un registro
 * @param {*} req 
 * @param {*} res 
 */

const createItem = async (req, res) => {
    try {
        console.log("creacion de items")
         //matcheddata->deja el objeto de la data que especifique en models
        const body = matchedData(req,{ locations: ['body'] })
        const data =await movieModel.create(body)
        res.status(201).json(data);
        /*res.send(data)*/
        
    }catch(e){
        console.log(e)
        handleHttpError(res, 'BAD REQUEST',400)
    }

};


/**
 * Actualizar un registro
 * @param {*} req 
 * @param {*} res 
 */


const updateItem = async (req, res) => {
    try {
        const { id_user, ...body } = matchedData(req);

        // Validar que id_user está presente
        if (!id_user) {
            return handleHttpError(res, 'BAD REQUEST', 400);
        }

        // Remover campos no deseados del cuerpo
        /*delete body.createdAt;
        delete body.updatedAt;
        delete body.__v;*/

        const data = await movieModel.findOneAndUpdate(
            { id_user: id_user },
            body,
            { new: true } // Para devolver el documento actualizado
        );

        if (!data) {
            return handleHttpError(res, 'NOT FOUND', 404);
        }

        res.send({ data });
    } catch (e) {
        console.error(e);
        handleHttpError(res, 'BAD REQUEST', 400);
    }
};

/*Eliminar registro*/
const deleteItem = async (req, res) => {
    try {
        req = matchedData(req);
        const { id_user } = req;
        const result = await movieModel.deleteOne({ id_user: id_user });

        if (result.deletedCount === 0) {
            return handleHttpError(res, 'NOT FOUND', 404);
        }

        res.send({ message: 'Record deleted successfully' });
    } catch (e) {
        handleHttpError(res, 'BAD REQUEST', 400);
    }
};



module.exports= {getItems,getItem,createItem,updateItem,deleteItem};