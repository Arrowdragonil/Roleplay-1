const MasterRoutes = require('express').Router()

const { getMaster, postMaster, updateMaster, deleteMaster } = require('../controllers/master.controller')

MasterRoutes.post('/register', postMaster)
MasterRoutes.post('/login', getMaster)
MasterRoutes.patch('/:id', updateMaster)
MasterRoutes.delete('/:id', deleteMaster)

module.exports = MasterRoutes