const Player = require('../models/player.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { setError } = require('../../dae/error/error')

const postPlayer = async (req, res, next) => {
    try{
        const newPlayer = new Player(req.body)
        const players =  newPlayer.save()
        return res.json({
            status:200,
            message: 'Player',
            data: {players}
        })
    }catch(error){
        return next(setError(500, 'fallo'))
    }
}

const getPlayer = async (req, res, next) => {
    
  try{
    const userInfo = await Player.findOne({name: req.body.name})
    
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
        message: 'Welcome user',
        user: userInfo,
        token: token
    })

    
} else {
    return next('Incorrect password')
}
    
}catch(error){
    return next(setError(500, 'El user no se logeo'))
}

}

const updatePlayer = async (req, res, next) => {
    try {
        
      const { id } = req.params
      const pacthPlayerDB = new Player(req.body)
      pacthPlayerDB._id = id;
      const updatePlayerDB = await Player.findByIdAndUpdate(id, pacthPlayerDB)
      if (!updatePlayerDB){ 
        return next('Band not found');
    }
    return res.status(200).json({
      new: pacthPlayerDB,
      old: updatePlayerDB,
    });
      
    } catch (error) {
      return next(error)
    }
  }
  
  const deletePlayer = async (req, res, next) => {
    try {
      const { id } = req.params
      const player = await Player.findByIdAndDelete(id)
      return res.status(200).json(player)
    } catch (error) {
      return next(error)
    }
  }

module.exports = {getPlayer, postPlayer, updatePlayer, deletePlayer}