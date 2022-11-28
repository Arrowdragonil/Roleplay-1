const Master = require('../models/master.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const { setError } = require('../../dae/error/error')

const postMaster = async (req, res, next) => {
    try{
        const newUser = new Master(req.body)
        const userDuplicate = await Master.findOne({name: newUser.name})
        
        if (userDuplicate) return next('ya existe')
        
        const master = newUser.save()
        return res.json({
            status:200,
            message: 'Master',
            data: master
        })
    }catch(error){
        return next(setError(500, 'fallo'))
    }
}

const getMaster = async (req, res, next) => {
    
    try{
        const userInfo = await Master.findOne({name: req.body.name})
        
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
            message: 'Welcome Master',
            user: userInfo,
            token: token
        })

        
    } else {
        return next('Incorrect password')
    }
        
    }catch(error){
        return next(setError(500, 'El master no se logeo'))
    }

}

const updateMaster = async (req, res, next) => {
    try {
        
      const { id } = req.params
      const pacthMasterDB = new Master(req.body)
      pacthMasterDB._id = id;
      const updateMasterDB = await Master.findByIdAndUpdate(id, pacthMasterDB)
      if (!updateMasterDB){ 
        return next('Band not found');
    }
    return res.status(200).json({
      new: pacthMasterDB,
      old: updateMasterDB,
    });
      
    } catch (error) {
      return next(error)
    }
  }
  
  const deleteMaster = async (req, res, next) => {
    try {
      const { id } = req.params
      const master = await Master.findByIdAndDelete(id)
      return res.status(200).json(master)
    } catch (error) {
      return next(error)
    }
  }

module.exports = {getMaster, postMaster, deleteMaster, updateMaster}