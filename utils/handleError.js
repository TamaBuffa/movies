
const handleHttpError = (res, detail = 'Algo sucedió', code = 400, message = 'Validation Error') => {
    res.status(code).json({ detail, code, message });   
};

module.exports = { handleHttpError }
