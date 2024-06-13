const {check} =require ("express-validator");
const validateResults=require ("../utils/handleValidator")

// Expresión regular para validar el formato de poster_url
const pathRegex = /^(\/[a-zA-Z0-9_\-]+\.jpg|https:\/\/image\.tmdb\.org\/t\/p\/original\/[a-zA-Z0-9_\-]+\.jpg)$/;

const validatorCreateItem=[
    
    check("idTmbd")
        .notEmpty().withMessage("idTmbd no puede estar vacío") 
        .isNumeric().withMessage("idTmbd debe ser un número"),

    check ("title")
        .notEmpty().withMessage("title no puede estar vacío")
        .isString().withMessage("comment debe ser texto"),

    check("poster_url")
        .notEmpty().withMessage("poster_url no puede estar vacío")
        .matches(pathRegex).withMessage("poster_url debe tener un formato válido"),

    check ("overview")
        .notEmpty().withMessage("overview no puede estar vacío")
        .isString().withMessage("comment debe ser texto"),
    
    check ("comment")
        .notEmpty().withMessage("comment no puede estar vacío")
        .isString().withMessage("comment debe ser texto"),
    
    check ("releaseDate")
        .notEmpty().withMessage("releaseDate no puede estar vacío")
        .isString().withMessage("releaseDate debe ser texto"),

    check ("runtime")
        .notEmpty().withMessage("runtime no puede estar vacío")
        .isString().withMessage("runtime debe ser texto"),
  
    (req,res,next)=>{
        return validateResults(req,res,next)
    }
]


module.exports={validatorCreateItem}
