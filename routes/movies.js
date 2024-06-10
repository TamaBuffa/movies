const express = require ("express");
const router = express.Router();

/*const customHeader=require("../middleware/customHeader")*/
const { getItems,getItem,createItem, updateComment,deleteItem,deleteAll,deleteAllItemsUser} = require("../controllers/movie");
const {validatorCreateItem,validatorDeleteItem,validatorUpdateItem}=require ("../validators/movie");


/*Listar todos las peliculas del usuario*/
router.get("/",getItems);

/*Obtener un detalle de una pelicula*/
router.get("/:id", getItem);

/*router.get("/",getAllItems)*/

/*Agrega una pelicula*/
router.post("/",validatorCreateItem, createItem);

/*Actualiza unicamente el comentario*/
router.patch("/:id", updateComment);

//Eliminar una pelicula*/
router.delete("/:id", deleteItem);

//Borrar todas las peliculas de un usuario
router.delete("/",deleteAllItemsUser)

/*Borrar todo*/
/*router.delete("/", deleteAll);*/

//patch -->es un cambio parcial
//omito lo que no me envias, y actualizo unicamente lo que me envias
//validaciones, todos los campos son opcionales



/*utilizando el middleware*/
/*router.post("/",validatorCreateItem, customHeader, createItem);*/



module.exports=router;