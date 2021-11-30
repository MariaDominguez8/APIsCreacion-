const db = require('../../database/models');

const findAllGenres = async (req, res) => {
  try {
    const genres = await db.Genre.findAll();
    const locals = {
      meta: {
        status: 200,
        total: genres.length,
        url: req.url
      },
      data: genres
    }
    res.json(locals)

  } catch (error) {
    res.json({error: error})
  }
}
const findById = async (req, res) => {
  try {
    const genre = await db.Genre.findByPk(req.params.id);
    const locals = {
      meta: {
        status: 200,
        url: req.url
      },
      data: genre
    }
    res.json(locals)
  } catch (error) {
    res.json({error: error})
  }
}
module.exports = {
  findAllGenres,
  findById,
}