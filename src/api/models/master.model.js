const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const masterSchema = new mongoose.Schema(
    
    {
        name: {type: String, required: true, unique: true},
        password: {type: String, required: true}, 
        player: [{ type: mongoose.Schema.Types.ObjectId, ref: 'player'}]
    },
    {
        timestamps: true
    }
)

masterSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
  })
module.exports = mongoose.model("master", masterSchema)