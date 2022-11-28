const mongoose = require("mongoose")

const gamesSchema = new mongoose.Schema(
    {
        name: {type: String, required: true, unique: true},
        type: {type: String, required: true},
        users: { type: String, required: true}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("games", gamesSchema)