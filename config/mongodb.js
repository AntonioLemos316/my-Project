const mongoose = require('mongoose');

const conexao = mongoose.connect('mongodb://127.0.0.1:27017/eCommerceCamisas')
.then(() => console.log('Connected!'))
.catch(() => console.log('Erro ao se conectar!'))

module.exports = conexao

