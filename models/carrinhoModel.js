const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carrinhoSchema = new Schema({
    usuarioId: {type: Schema.Types.ObjectId, ref: 'User'},
    itens: [{type: Schema.Types.ObjectId, ref: 'Camisa'}],
    carrinhoCriadoEm: {type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['ativo', 'inativo', 'finalizado', 'cancelado'],
        default: 'ativo'
    } 
})

const Carrinho = mongoose.model('Carrinho', carrinhoSchema)
module.exports = Carrinho