const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    nome: { type: String, required: true, },
    senha: { type: String, required: true, minlength: 3 },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    role: { type: String, enum: ['normal', 'admin'], default: 'normal' },
    carrinhos: [{ type: Schema.Types.ObjectId, ref: 'Carrinho' }]
})

const User = mongoose.model('User', userSchema)
module.exports = User