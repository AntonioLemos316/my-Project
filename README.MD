## API eCommerce Camisas (possivel alteração no nome)

#### DSI 06 | Grupo: Ruama Vitória, Joelma Nayara, Winicius Gabriel, Jamerson Curchatuz, Christian Manoel
#### Apoio: Antônio Marques
A API eCommerce Camisas, fornecerá base para um e-commerce a principio de camisas. Contara com uma interface amigável, na qual permite que usuários pesquisem e comprem camisas de forma eficiente e segura.

## Funcionalidades

- Cadastro de usuários, camisas, compras
- Login de usuários (em desenvolvimento)
- Exibição de usuários, camisas, compras e carrinhos
- Atualização de usuários, camisas, compras e carrinhos
- Deleção de usuários, camisas, compras 
- Finalização de compras (em desenvolvimento)

## Tecnologias Utilizadas

- **Front-end**: 
  - React(em planejamento)

- **Back-end**:
  - Node.js
  - Express
  - MongoDB
  - Mongoose

## Estrutura do Projeto
```
my-project/
│
├── client/
│   ├── image/
│   ├── carrossel.js
│   ├── index.html
│   ├── styles.css
├── server/
│   ├── config/
│   │   ├── mongoDb.js
│   ├── middleware/
│   ├── models/
│   │   ├── CamisaModel.js
│   │   └── CarrinhoModel.js
│   │   └── CompraModel.js
│   │   └── UserModel.js
│   ├── routes/
│   │   └── CamisaRoutes.js
│   │   └── CarrinhoRoutes.js
│   │   └── CompraRoutes.js
│   │   └── UserRoutes.js
│   ├── script/
│   │   └── createAdmin.js
│   └── index.js
│   └── package-lock.json
│   └── package.json
├── .gitignore
└── README.md
```

## Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado
- [ThunderClient](https://www.thunderclient.com/) para gerenciar as requisições ou postman instalado
- [Postman](https://www.postman.com/downloads/) para gerenciar as requisições ou thunder client extensão
- [MongoDB](https://www.mongodb.com/try/download/community) para gerenciar o MongoDB / Mongoose

### Configuração do Banco de Dados

1. Inicie o compass para conectar ao MongoDB ou inicie com a extensão no vscode chamada de Database Client JDBC criado por Weijan Chen.
2. Ao inicar o servidor express o mongoDb criara a base de dados eCommerceCamisas se passado no endereço da conexão.

### Executando o Projeto

1. Clone o repositório:
```bash
   git clone https://github.com/ruamaszxo16/my-Project

   cd server // mudança de pasta

   npm install // instalando o node_modules

   npm run dev // iniciando o servidor
```

## Exemplo de uso

### Rotas e exemplos

#### Camisas
```
POST    /camisas
{
  "nome":"Adidas",
  "preco":49.90,
  "descricao":{ 
    "tamanho":"M", 
    "cor":"Azul"
  },
  "imagemUrl":"camisa-academia.png"
}

GET     /camisas

GET     /camisas/:id

PATCH   /camisas/:id
{
  "descricao": {"cor":"Amarela"}
}

DELETE  /camisas/:id
```

#### Users
```
POST    /users
{
 "nome":"Antonio",
 "senha":123,
 "email":"antonio@example.com"
}

GET     /users

GET     /users/:id

PATCH   /users/:id
{
 "senha":"1234"
}

DELETE  /users/:id
```

#### Carrinhos
```
GET     /carrinhos

GET     /carrinhos/:id

PATCH   /carrinhos/adicionar/:id
{
 "camisaId":"67121b3894d3006082dca66f"
}

PATCH   /carrinhos/aumentar/:id
{
 "camisaId":"6711a1564e850d6fcd2e282f",
 "quantidade": 1
}

PATCH   /carrinhos/diminuir/:id
{
  "camisaId":"6711a1564e850d6fcd2e282f",
  "quantidade": 1
}

DELETE  /carrinhos/:carrinhoId/remover/:camisaId
```

#### Compras
```
POST   /compras/pendente/:carrinhoId

GET    /compras/

GET    /compras/:id

PATCH  /compras/:id
{
  "status": "concluída"
}
```
