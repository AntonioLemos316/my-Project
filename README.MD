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

- :contentReference[oaicite:0]{index=0}
- :contentReference[oaicite:1]{index=1}
- :contentReference[oaicite:2]{index=2}
- :contentReference[oaicite:3]{index=3}

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

## Exemplo de uso

### Rotas e exemplos

## Camisas
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

## Users
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

## Carrinhos
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

## Compras
```
POST   /compras/pendente/:carrinhoId

GET    /compras/

GET    /compras/:id

PATCH  /compras/:id
{
  "status": "concluída"
}
```
