const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nome: { 
        type: String,
        required: true, 
    },
    email: { 
        type: String,
        required: true, 
        unique: true,
        match: /.+\@.+\..+/
    },
    senha: { 
        type: String,
        required: true, 
        minlength: 3
    },
    camisa: [{
        type: Schema.Types.ObjectId,
        ref: 'Camisa',
        required: false,
        default: []
    }]
})

const User = mongoose.model('User', userSchema)

module.exports = User