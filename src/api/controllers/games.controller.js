const Games = require('../models/games.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { setError } = require('../../dae/error/error')

const postGames = async (req, res, next) => {
    
    try{
        const newGame = new Games(req.body)
        const games = newGame.save()
        return res.json({
            status:200,
            message: 'juego registrado',
            data: {games}
        })
    }catch(error){
        return next(setError(500, 'fallo'))
    }
}

const getGames = async (req, res, next) => {
    
    try{
        const userInfo = await Games.findOne({name: req.body.name})
        
        if (bcrypt.compareSync(req.body.password, userInfo.password)) {
        
        userInfo.password = null
        
        const token = jwt.sign(
            {
                id: userInfo._id,
                password:userInfo._id,
                name: userInfo.name
                
            },

            req.app.get("secretKey"),
            { expiresIn: '24h' }
        )
        
        return res.json({
            status:200,
            message: 'Welcome to the game',
            user: userInfo,
            token: token
        })

        
    } else {
        return next('Incorrect password')
    }
        
    }catch(error){
        return next(setError(500, 'El game no se encontro'))
    }

}

module.exports = {getGames, postGames }







