const Ficha = require('../models/ficha.model')
const jwt = require('jsonwebtoken')
const { setError } = require('../../dae/error/error')

const postFicha = async (req, res, next) => {
    try{
        const newFicha = new Ficha(req.body)
        const fichas =  newFicha.save()
        return res.json({
            status:200,
            message: 'ficha del personaje',
            data: {fichas}
        })
    }catch(error){
        return next(setError(500, 'fallo'))
    }
}

const getFicha = async (req, res, next) => {
    try{
        const userInfo = await master.findOne({name: req.body.name})
    if (bcrypt.compareSync(req.body.password, userInfo.password)){
        userInfo.password = null
        const token = jwt.sign(
            {
                id:userInfo._id,
                name: userInfo.name
            },

            req.app.get("secretKey"),
            {expiresIn: '24h'}
        )

        return res.json({
            status:200,
            message: 'Master',
            data: {master},
            token: token
        })
    } else {
        return next('Incorrect password')
    }
        /* const master = await Master.find()
        return res.json({
            status:200,
            message: 'Master',
            data: {master}
        }) */
    }catch(error){
        return next(setError(500, 'fallo'))
    }
}

module.exports = {getFicha, postFicha}