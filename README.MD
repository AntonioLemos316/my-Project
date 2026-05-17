## eCommerce Shirts API

#### DSI 06 | Grupo: Ruama Vitória, Joelma Nayara, Winicius Gabriel, Jamerson Curchatuz, Christian Manoel
#### Apoio: Antônio Marques
REST API para gerenciamento de usuários, produtos, carrinhos e compras em um sistema de e-commerce.

## Funcionalidades

### Implementadas
- CRUD de usuários
- CRUD de produtos
- CRUD de compras
- Carrinho de compras

### Em desenvolvimento
- autenticação JWT
- finalização de pagamento

## Stack

- Mongodb
- Node
- JavaScript

## Estrutura do Projeto
```
server/
├── config/
├── middleware/
├── models/
├── routes/
├── scripts/
└── index.js
```

## Instalação

### Como executar

```bash
git clone https://github.com/AntonioLemos316/my-Project/
cd server
npm install
npm run dev
```

## Entidades, Endpoints e Exemplos de Criação

#### Camisas
- nome
- preco
- descricao, tamanho, cor
- imagemUrl
```
POST    /camisas
GET     /camisas
GET     /camisas/:id
PATCH   /camisas/:id
DELETE  /camisas/:id
```
```
{
  "nome":"Adidas",
  "preco":49.90,
  "descricao":{ 
    "tamanho":"M", 
    "cor":"Azul"
  },
  "imagemUrl":"camisa-academia.png"
}
```

#### Users
- nome
- senha
- email
```
POST    /users
GET     /users
GET     /users/:id
PATCH   /users/:id
DELETE  /users/:id
```
```
{
 "nome":"Antonio",
 "senha":123,
 "email":"antonio@example.com"
}
```

#### Carrinhos
- camisaId
- quantidade
```
GET     /carrinhos
GET     /carrinhos/:id
PATCH   /carrinhos/adicionar/:id
PATCH   /carrinhos/aumentar/:id
PATCH   /carrinhos/diminuir/:id
DELETE  /carrinhos/:carrinhoId/remover/:camisaId
```
```
{
 "camisaId":"6711a1564e850d6fcd2e282f",
 "quantidade": 1
}
```

#### Compras
- status
```
POST   /compras/pendente/:carrinhoId
GET    /compras/
GET    /compras/:id
PATCH  /compras/:id
```
```
{
  "status": "concluída"
}
```
