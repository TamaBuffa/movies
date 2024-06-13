const { handleHttpError } = require("../utils/handleError");
const axios = require('axios');
const { verifyUserIdEmpty, verifyUserIdNonExistent } = require("../utils/verifyUser");

/**
 * Middleware para autenticar al usuario
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authenticateUser = async (req, res, next) => {

    console.log("Entreeeee")
    try {
        const token = req.headers['authorization'];
        console.log("tokeeeennn",token)
        if (!token) {
            return handleHttpError(res, 'El token se encuentra vacio', 400, 'Token vacio');
        }

        const response = await axios.get(`${process.env.USER_BACKEND_URL}/me`, {
            headers: { 'Authorization': token }
        });
        
        console.log(response.data); // Añade esta línea para depurar

        const usuarioId = response.data.user_id;
        
        if (!verifyUserIdEmpty(res, usuarioId)) {
            return;  
        }

        if (!verifyUserIdNonExistent(res, usuarioId)) {
            return;  
        }

        req.usuarioId = usuarioId;
        next();

  
    } catch (e) {
        if (e.response) {
            // Respuesta del servidor recibida pero hay un problema con la solicitud
            if (e.response.status === 401) {
                return handleHttpError(res, 'El token es inválido', 401, 'Token inválido');
            } else {
                return handleHttpError(res, 'La consulta es inválida', 400, 'Consulta inválida');
            }
        } else if (e.request) {
            // La solicitud fue hecha pero no hubo respuesta
            console.error('Error de conexión: ', e.request);
            return handleHttpError(res, 'Ocurrió un error de conexión', 503, 'Error de conexión');
        
        } else {
            // Algo sucedió al configurar la solicitud
            console.error('Error: ', e.message);
            return handleHttpError(res, 'Ocurrió un error inesperado', 500, 'Error inesperado');
        }
    }
};
module.exports = { authenticateUser };
