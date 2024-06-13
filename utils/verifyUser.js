const { handleHttpError } = require("./handleError");

const userIdRegex = /^[a-zA-Z0-9_\-]+$/;


const verifyUserIdEmpty = (res, usuarioId) => {
    if (!usuarioId || usuarioId.trim() === "" || usuarioId === "None") {
        handleHttpError(res, 'El Id del usuario se encuentra vacío o es inválido', 401, 'Id de usuario vacío o inválido');
        return false;
    }
    return true;
};

const verifyUserIdNonExistent = (res, usuarioId) => {
    if (!usuarioId.match(userIdRegex)) {
        handleHttpError(res, 'El Id del usuario es inválido', 401, 'Id de usuario inválido');
        return false;
    }
    
    const userExists = true; 

    if (!userExists) {
        handleHttpError(res, 'El Id del usuario es inexistente', 401, 'Id de usuario inexistente');
        return false;
    }
    return true;
};

module.exports = { verifyUserIdEmpty, verifyUserIdNonExistent };
