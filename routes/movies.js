const express = require ("express");
const router = express.Router();
const { getItems,getItem,createItem,updateComment,deleteItem,deleteAllItemsUser} = require("../controllers/movie");
const { authenticateUser } = require('../middleware/authenticateUser');
const { validateUserId } = require('../middleware/validateUserId');
const {validateId} = require('../middleware/validateId');
const {validatorCreateItem}=require('../middleware/validateReq');


/*Listar todos las peliculas del usuario*/
router.get("/",authenticateUser,getItems);

/*Obtener un detalle de una pelicula*/
router.get("/:id",validateId, authenticateUser,getItem);

/*router.get("/",getAllItems)*/

/*Agrega una pelicula*/
router.post("/",validatorCreateItem,authenticateUser, createItem);

/*Actualiza unicamente el comentario*/
router.patch("/:id",validateId,authenticateUser,updateComment);

//Eliminar una pelicula*/
router.delete("/:id", validateId,authenticateUser,deleteItem);

//Borrar todas las peliculas de un usuario
router.delete("/:user_id/movies",validateUserId,deleteAllItemsUser)


/*router.delete("/", deleteAll);*/

//patch -->es un cambio parcial
//omito lo que no me envias, y actualizo unicamente lo que me envias
//validaciones, todos los campos son opcionales

/*utilizando el middleware*/
/*router.post("/",validatorCreateItem, customHeader, createItem);*/

module.exports=router;