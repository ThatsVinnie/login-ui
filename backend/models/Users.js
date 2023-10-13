const mongoose = require('mongoose')

const {Schema} = mongoose

const userSchema = new Schema({
    
    name: {type: String, required: true, trim: true},
    mail:{type: String, required: true, trim: true},
    pass:{type:String, require: true, trim: true}

}, {timestamps: true})

const User = mongoose.model('User', userSchema)

module.exports = {User, userSchema}