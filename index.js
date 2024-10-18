// Chamando as dependencias instaladas
const express = require('express');
const conexao = require('./config/mongodb.js')
const morgan = require('morgan')
const CamisaRoutes = require('./routes/CamisaRoutes.js')
const UserRoutes = require('./routes/UserRoutes.js')
const CarrinhoRoutes = require('./routes/CarrinhoRoutes.js')
const CompraRoutes = require('./routes/CompraRoutes.js')

// Atribuindo o express() em app
const app = express();

// Estabelecendo a conexão com o banco de dados
conexao

// Middleware para exibir o uso da API no terminal
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))

// Middleware para reconhecer e tratar requisições JSON
app.use(express.json());

// Declaração de onde as rotas de camisas serão usadas na API
app.use(`/users`, UserRoutes)
app.use(`/camisas`, CamisaRoutes)
app.use(`/carrinhos`, CarrinhoRoutes)
app.use(`/compras`, CompraRoutes)

// Middleware caso não passe uma rota válida
app.use((req, res) => {
    res.status(404).send({message: '404 - Not Found, rota inválida!'});
});

// Definindo a PORTA do server como 3000 
const PORT = 3000;

// Iniciando o servidor
app.listen(PORT, () => console.log(`Servidor rodando em http://localhost:${PORT}`))
