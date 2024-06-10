const {validationResult} = require ("express-validator")


const validateResults=(req, res, next)=>{
try{
    
    validationResult(req).throw()
    //si no existe un error con la validacion, continua hacia el controlador
    return next()

}catch (err){
    console.log(req)
    console.log(err)
    //sino envia un 400, y un array con error
    res.status(400).send({ errors: err.array() });
    //res.send({errors:err.array()})
    }
}

module.exports=validateResults