## Projeto Full-Stack e-commerce
### Rotas e exemplos
#### Camisas

```
POST    /camisas
{
  "nome":"Nike",
  "preco":99.90,
  "descricao":{ 
    "tamanho":"P", 
    "cor":"Rosa"
  },
  "imagemUrl":"camisa-academia.png"
}

GET     /camisas

GET     /camisas/671193e2a051c2bc1ae63cdb

PATCH   /camisas/671193e2a051c2bc1ae63cdb
{
  "descricao": {"cor":"Amarela"}
}

DELETE  /camisas/671193e2a051c2bc1ae63cdb
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

GET     /users/6711926ba051c2bc1ae63cd5

PATCH   /users/6711926ba051c2bc1ae63cd5
{
 "senha":"1234"
}

DELETE  /users/6711926ba051c2bc1ae63cd5
```

#### Carrinhos
```
GET     /carrinhos

GET     /carrinhos/6711926ba051c2bc1ae63cd7

PATCH   /carrinhos/adicionar/6711926ba051c2bc1ae63cd7
{
 "camisaId":"6711a1564e850d6fcd2e282f"
}

PATCH   /carrinhos/aumentar/6711926ba051c2bc1ae63cd7
{
 "camisaId":"6711a1564e850d6fcd2e282f",
 "quantidade": 1
}

PATCH   /carrinhos/diminuir/6711926ba051c2bc1ae63cd7
{
  "camisaId":"6711a1564e850d6fcd2e282f",
  "quantidade": 1
}

DELETE  /carrinhos/6711926ba051c2bc1ae63cd7/remover/6711a1564e850d6fcd2e282f
```

#### Compras
```
POST   /compras/pendente/6711926ba051c2bc1ae63cd7
GET    /compras/
GET    /compras/671194fea051c2bc1ae63d0f
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