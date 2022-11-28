const GamesRoutes = require('express').Router()

const { isAuth } = require('../middlewares/auth.middleware')

const { getGames, postGames } = require('../controllers/games.controller')

GamesRoutes.post('/login', [isAuth],getGames)
GamesRoutes.post('/register', [isAuth], postGames)

module.exports = GamesRoutes




