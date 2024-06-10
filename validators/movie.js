const {check} =require ("express-validator");
const validateResults=require ("../utils/handleValidator")

const validatorCreateItem=[
    check ("comment")
    .notEmpty().withMessage("comment no puede estar vacío")
    .isString().withMessage("comment debe ser una cadena de texto"),

    check("idTmbd")
        .notEmpty().withMessage("idTmbd no puede estar vacío") 
        .isNumeric().withMessage("idTmbd debe ser un número"),

    check ("title")
        .notEmpty().withMessage("title no puede estar vacío")
        .isString().withMessage("comment debe ser una cadena de texto"),

    check("poster_url")
        .notEmpty().withMessage("poster_url no puede estar vacío"),

    check ("overview")
        .notEmpty().withMessage("overview no puede estar vacío")
        .isString().withMessage("comment debe ser una cadena de texto"),

    check ("releaseDate")
        .notEmpty().withMessage("releaseDate no puede estar vacío")
        .isString().withMessage("releaseDate debe ser una cadena de texto"),

    check ("runtime")
        .notEmpty().withMessage("runtime no puede estar vacío")
        .isString().withMessage("runtime debe ser una cadena de texto"),
  
   // .isMongoId(),
    (req,res,next)=>{
        return validateResults(req,res,next)
    }
]

/*
const validatorGetItem = [
    check("user_id")
        .exists()
        .notEmpty()
        .isString(), // Asegúrate de que id_user es un string no vacío
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]*/


const validatorDeleteItem = [
    check("user_id")
        .exists()
        .notEmpty()
        .isString(), // Asegúrate de que id_user es un string no vacío
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorUpdateItem = [
    check("user_id")
        .notEmpty()
        .isString(), // id_user es un string no vacío
        
    check("idTmbd")
        .notEmpty()
        .isNumeric(),

    check ("title")
        .notEmpty(),

    check("poster_url")
        .notEmpty(),

    check ("overview")
        .notEmpty(),

    check ("comment")
        .notEmpty()
        .isString(), 

    check ("releaseDate")
        .notEmpty()
        .isNumeric(),

    check ("runtime")
        .notEmpty(),
  
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports={validatorCreateItem,validatorDeleteItem,validatorUpdateItem}