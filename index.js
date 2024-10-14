// Chamando as dependencias instaladas
const express = require('express');
const conexao = require('./config/mongodb.js')
const camisaRoutes = require('./routes/camisaRoutes.js')
const userRoutes = require('./routes/userRoutes.js')

// Atribuindo o express() em app
const app = express();

// Estabelecendo a conexão com o banco de dados
conexao

// Middleware para reconhecer e tratar requisições JSON
app.use(express.json());

// Declaração de onde as rotas de camisas serão usadas na API
const API = 'api/v1'
app.use(`/${API}/camisas`, camisaRoutes)
app.use(`/${API}/users`, userRoutes)

// Definindo a PORTA do server como 3000 
const PORT = 3000;

// Iniciando o servidor
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))
