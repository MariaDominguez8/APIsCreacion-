const db = require('../../database/models');

const findAllMovies = async (req, res) => {
  try {
    const movies = await db.Movie.findAll();
    const locals = {
      meta: {
        status: 200,
        total: movies.length,
        url: req.url
      },
      data: movies
    }
    res.json(locals)

  } catch (error) {
    res.json(error.toString().trim())
  }
}

const createMovie = async (req, res) => {
  const {title, rating, awards, release_date, length, genre_id} = req.body;
  try {
    if(!(title && rating && awards && release_date)) {
      console.log("Sucedio un error")
      throw new Error(`Required ${title? "" : "title "}${rating? "" : "rating "}${awards? "" : "awards "}${release_date? "" : "release_date"}`);
    }

    const movie = await db.Movie.create({
      title,
      rating,
      awards,
      release_date,
      length: length || null,
      genre_id: genre_id || null
    })

    res.json({
      operation: {type: "Add", status: "successfully"},
      movie
    })
  } catch(e) {
    res.json({
      error: e.toString().trim().slice().split("Error: ")[1],
      status: "The movie was not created"
    })
  }
}

const deleteMovieById = async (req, res) => {
  try {
    const movie = await db.Movie.findByPk(req.params.id)
    if(!movie) throw new Error("La película no existe"
    )
    await db.Movie.destroy({where: {id: req.params.id}})

    res.json({
      operation: {type: "Delete", status: "successfully"},
      movie
    })
  } catch(e) {
    res.json({
      error: e.toString().trim().slice().split("Error: ")[1],
      status: "The movie was not deleted"
    })
  }
}

const findMovieById = async (req, res) => {
  try {
    const movie = await db.Movie.findByPk(req.params.id);
    if(!movie) throw new Error("La película no existe"
    )
    const locals = {
      meta: {
        status: 200,
        url: req.url
      },
      data: movie
    }
    res.json(locals)
  } catch (e) {
    res.json({
      movieId: req.params.id,
      error: e.toString().trim().slice().split("Error: ")[1],
      status: res.status(404).statusCode,
    })
  }
}



module.exports = {
  findAllMovies,
  findMovieById,
  deleteMovieById,
  createMovie,
}