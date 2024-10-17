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

/* 
Exemplo de JSON 
  "camisaId":"agsg41468g6as4g68a",
  "quantidade":1
Exemplo do que será passado no corpo da requisição = req.body
*/