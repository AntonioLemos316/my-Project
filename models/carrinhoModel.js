const mongoose = require('mongoose')
const Schema = mongoose.Schema

const carrinhoSchema = new Schema({
    usuarioId: {type: Schema.Types.ObjectId, ref: 'User'},
    itens: [{
        camisaId: {type: Schema.Types.ObjectId, ref: 'Camisa'},
        quantidade: {type: Number, required: true}
    }],
    carrinhoCriadoEm: {type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['ativo', 'inativo', 'finalizado', 'cancelado'],
        default: 'ativo'
    } 
})

const Carrinho = mongoose.model('Carrinho', carrinhoSchema)
module.exports = Carrinho

//http://localhost:3000/api/v1/carrinhos/671038f9ce64702c2f790824