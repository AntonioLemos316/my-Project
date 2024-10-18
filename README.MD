## Projeto Full-Stack e-commerce
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
```
## Baixar ou Clonar 
```
git clone "endereço do projeto"
```

## Como instalar
```
npm install
```

## Inicar a API
```
npm run dev
```