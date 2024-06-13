
/**
 * Formatea los datos de las películas para enviar solo los campos deseados
 * @param {Array} data - Array de datos de películas
 * @returns {Array} - Array de datos formateados
 */

const formatMovieData = (data) => {
        return data.map(movie => ({
        id: movie._id,
        user_id: movie.user_id,
        idTmbd: movie.idTmbd,
        title: movie.title,
        poster_url: movie.poster_url,
        overview: movie.overview,
        comment: movie.comment,
        releaseDate: movie.releaseDate,
        runtime: movie.runtime
    }));
};

module.exports = { formatMovieData };
