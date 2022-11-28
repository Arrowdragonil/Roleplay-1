const PlayerRoutes = require('express').Router()



const { getPlayer, postPlayer, updatePlayer, deletePlayer } = require('../controllers/player.controller')

PlayerRoutes.post('/login',getPlayer)
PlayerRoutes.post('/register', postPlayer)
PlayerRoutes.patch('/:id', updatePlayer)
PlayerRoutes.delete('/:id', deletePlayer)

module.exports = PlayerRoutes