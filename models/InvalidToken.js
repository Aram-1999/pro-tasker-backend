const mongoose = require('mongoose')

const invalidTokenSchema = new mongoose.Schema({
    tokenId: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 43200
    }
})

const InvalidToken = mongoose.model('InvalidToken', invalidTokenSchema)

module.exports = InvalidToken;