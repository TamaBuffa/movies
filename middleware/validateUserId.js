const { handleHttpError } = require('../utils/handleError');
const { verifyUserIdEmpty, verifyUserIdNonExistent } = require('../utils/verifyUser');

const validateUserId = (req, res, next) => {
    const user_id = req.params.user_id;

    if (!verifyUserIdEmpty(res, user_id) || !verifyUserIdNonExistent(res, user_id)) {
        return; 
    }

    next();
};

module.exports = { validateUserId };
