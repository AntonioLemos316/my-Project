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

/* 
Exemplo de JSON 
  "nome":"Nike",
  "preco":99.90,
  "descricao":{
    "tamanho":"P",
    "cor":"Rosa",
  },
  "imagemUrl":"camisa-academia.png"
Exemplo do que será passado no corpo da requisição = req.body
*/