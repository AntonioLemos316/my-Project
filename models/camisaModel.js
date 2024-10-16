const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const camisaSchema = new Schema({
  nome: { type: String, required: true, },
  preco: { type: Number, required: true, },
  descricao: { 
    tamanho: { type: String, required: true }, 
    cor: { type: String, required: true }
  },
  imagemUrl: { type: String, required: true }
});

const Camisa = mongoose.model('Camisa', camisaSchema)
module.exports = Camisa