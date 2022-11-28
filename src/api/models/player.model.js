const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const playerSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        info: {type: String, required: true},
        master: [{ type: mongoose.Schema.Types.ObjectId, ref: 'master'}]
        
    },
    {
        timestamps: true
    }
)

playerSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
  })
module.exports = mongoose.model("player", playerSchema)