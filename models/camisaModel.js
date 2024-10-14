const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const camisaSchema = new Schema({
  id: ObjectId,
  marca: String,
  tamanho: String,
  cor: String,
  preco: Number
});

const Camisa = mongoose.model('Camisa', camisaSchema)
module.exports = Camisa