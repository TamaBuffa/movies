const {check} =require ("express-validator");
const validateResults=require ("../utils/handleValidator")

const validatorCreateItem=[
    check("id_user")
    .notEmpty()
    .isString(), // Asegúrate de que id_user es un string no vacío
    
    check ("title")
    .notEmpty(),

    check ("synopsis")
    .exists()
    .notEmpty(),

    check ("release_year")
    .exists()
    .notEmpty(),

    check ("runtime")
    .exists()
    .notEmpty(),

    check ("poster_url")
    .exists()
    .notEmpty(),

    check ("trailer")
    .exists()
    .notEmpty(),

   // .isMongoId(),
    (req,res,next)=>{
        return validateResults(req,res,next)
    }
]


const validatorGetItem = [
    check("id_user")
        .exists()
        .notEmpty()
        .isString(), // Asegúrate de que id_user es un string no vacío
    (req, res, next) => {
        return validateResults(req, res, next);
    }
]


const validatorDeleteItem = [
    check("id_user")
        .exists()
        .notEmpty()
        .isString(), // Asegúrate de que id_user es un string no vacío
    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

const validatorUpdateItem = [
    check("id_user")
        .exists()
        .notEmpty()
        .isString(), // Asegúrate de que id_user es un string no vacío

    check("title")
        .optional()
        .notEmpty(),

    check("synopsis")
        .optional()
        .notEmpty(),

    check("release_year")
        .optional()
        .notEmpty()
        .isNumeric(),

    check("runtime")
        .optional()
        .notEmpty(),

    check("poster_url")
        .optional()
        .notEmpty(),

    check("trailer")
        .optional()
        .notEmpty(),

    (req, res, next) => {
        return validateResults(req, res, next);
    }
];

module.exports={validatorCreateItem,validatorGetItem,validatorDeleteItem,validatorUpdateItem}