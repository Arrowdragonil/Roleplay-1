const dotenv = require("dotenv").config()

const mongoose = require("mongoose")

const { setError } = require('../error/error')
 

const connect = async () => {
  try {
    const db = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const { name, host } = db.connection;
    console.log(`Conectado a la base de datos : ${name} en el host: ${host}`);
  } catch (error) {
    console.error(setError(550, 'Not connect to DB'));
  }
};

module.exports = { connect }