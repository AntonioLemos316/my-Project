const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const camisaSchema = new Schema({
  marca: String,
  tamanho: String,
  cor: String,
  preco: Number
});

const Camisa = mongoose.model('Camisa', camisaSchema)

module.exports = Camisa