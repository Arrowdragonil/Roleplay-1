const FichaRoutes = require('express').Router()

const { isAuth } = require('../middlewares/auth.middleware')

const { getFicha, postFicha } = require('../controllers/ficha.controller')

FichaRoutes.post('/login', [isAuth],getFicha)
FichaRoutes.post('/register', [isAuth], postFicha)

module.exports = FichaRoutes