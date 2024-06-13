const { movieModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

/**
 * Verificar si ya existe una película para ese usuario por idTmbd o por título
 * @param {*} req 
 * @param {*} res 
 * @returns {Boolean} - Retorna true si existe una película, false en caso contrario
 */
const verifyMovieExistence = async (req, res) => {
    const usuarioId = req.usuarioId;
    const { idTmbd, title } = req.body;

    try {
        // Verificar si ya existe una película para ese usuario por idTmbd o por título
        const existeMovie = await movieModel.findOne({ 
            user_id: usuarioId, 
            $or: [{ idTmbd }, { title }]
        });

        if (existeMovie) {
            handleHttpError(res, 'La película ya existe para el usuario', 400, 'Película ya existente en favoritos');
            return true;
        }

        return false;
    } catch (e) {
        console.error(e);
        handleHttpError(res, 'Error al verificar la existencia de la película', 500, 'Error de servidor');
        return true;
    }
};

module.exports = { verifyMovieExistence };
