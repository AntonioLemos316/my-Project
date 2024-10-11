const mongoose = require('mongoose');
// module.exports
const conexao = mongoose.connect('mongodb://127.0.0.1:27017/test')
  .then(() => console.log('Connected!'));

module.exports = conexao

