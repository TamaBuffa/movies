const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
const { handleHttpError } = require('../utils/handleError');

const validateId = (req, res, next) => {
    const id = req.params.id; // Obtener el ID de los parámetros de la ruta
    
    // Verificar si el ID está presente y es un string
    if (!id || typeof id !== 'string') {
        return handleHttpError(res, 'El ID de MongoDB está vacío o no es un string', 400, 'ID vacío o no string');
    }
    
    // Verificar si el ID cumple con el formato de ObjectId de MongoDB
    if (!mongoIdRegex.test(id)) {
        return handleHttpError(res, 'El ID de MongoDB es inválido', 400, 'ID inválido');
    }

    next(); // Llama a next() para pasar al siguiente middleware o ruta
};

module.exports = {validateId};
