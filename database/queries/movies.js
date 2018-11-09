const knex = require('../connections');

async function getAllMovies() {
   return await knex('movies').select('*');
}

async function getSingleMovie(id) {
    return await knex('movies')
        .select('*')
        .where({ id: parseInt(id) })
}

async function addMovie(movie) {
    return await knex('movies')
        .insert(movie)
        .returning('*');
}

async function updatedMovie(id, movie) {
   return await knex('movies') 
        .update(movie)
        .where({ id: parseInt(id) })
        .returning('*');
}

async function deleteMovie(id) {
   return await knex('movies') 
        .del()
        .where({ id: parseInt(id) })
        .returning('*');
}

module.exports = {
    getAllMovies,
    getSingleMovie,
    addMovie,
    updatedMovie,
    deleteMovie
}