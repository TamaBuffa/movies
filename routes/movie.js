const express = require ("express");
const router = express.Router();
/*const customHeader=require("../middleware/customHeader")*/
const { getItems,getItem, createItem, updateItem,deleteItem} = require("../controllers/movie");
const {validatorCreateItem,validatorGetItem,validatorDeleteItem,validatorUpdateItem}=require ("../validators/movie");

/*Listar los items*/
router.get("/",getItems);

/*Obtener un detalle de item*/
router.get("/:id_user", validatorGetItem, getItem);


/*Crea un registro*/
//validatorCreateItem: para que realice una validacion, antes de crear un nuevo registro
router.post("/",validatorCreateItem, createItem);


/*Actualiza un registro*/
router.put("/:id_user",validatorUpdateItem, updateItem);

/*Eliminar un registro*/
router.delete("/:id_user",validatorDeleteItem, deleteItem);




/*utilizando el middleware*/
/*router.post("/",validatorCreateItem, customHeader, createItem);*/



module.exports=router;