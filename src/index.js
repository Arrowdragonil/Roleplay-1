const express = require('express')
const cors = require('cors')

const { connect } = require('./dae/db/connect')

const FichaRoutes = require('./api/routes/ficha.route')
const GamesRoutes = require('./api/routes/games.route')
const MasterRoutes = require('./api/routes/master.route')
const PlayerRoutes = require('./api/routes/player.route')

const { setError } = require('./dae/error/error')

connect()

const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
  })

  app.use(cors({ origin: (origin, callback) => callback(null, true), credentials: true }))

  app.use(express.json({ limit: '1mb' }))
  
  app.use(express.urlencoded({ limit: '1mb', extended: true }))
  
  app.set('secretKey', process.env.SECRET_KEY_JWT)
  
  app.use('/api/ficha', FichaRoutes)
  app.use('/api/games', GamesRoutes)
  app.use('/api/master', MasterRoutes)
  app.use('/api/player', PlayerRoutes)

  app.use('*', (req, res, next) => next(setError(404, 'Route not found')))

  app.use((error, req, res, next) => {
    return res.status(error.status || 500).json(error.message || 'Unexpected error');
  })
  
  app.listen(process.env.PORT, () => {
    console.log(`Server running on port: http://localhost:${process.env.PORT}`);
  });