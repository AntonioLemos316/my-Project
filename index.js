const express = require('express');
import conexao from './config/bancodedados.js';
const app = express();
const port = 3000;

// Middleware para tratar requisições JSON
app.use(express.json());

// Rota principal
app.get('/', (req, res) => {
  res.send('Bem-vindo ao servidor Node.js!');
});

conexao

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
