const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const fichasSchema = new mongoose.Schema(
    {
        characterName: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        history: {type: String, required: true},
        class: { type: String, required: true}
    },
    {
        timestamps: true
    }
)

fichasSchema.pre("save", function (next) {
    this.password = bcrypt.hashSync(this.password, 10)
    next()
  })
module.exports = mongoose.model("ficha", fichasSchema)