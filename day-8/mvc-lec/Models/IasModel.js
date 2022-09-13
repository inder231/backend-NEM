const mongoose = require('mongoose');

const iaSchema = mongoose.Schema({
    name: { type: String, required: true },
    course:String,
    branch:String,
    date: { type: Date, default: Date.now },
})
const IaModel = mongoose.model('ia',iaSchema)
module.exports = {IaModel};