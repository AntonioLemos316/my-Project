const express = require('express')
const User = require('../models/UserModel.js')
const Camisa = require('../models/CamisaModel.js')
const Carrinho = require('../models/CarrinhoModel.js')

const router = express.Router()

router.post('/', async (req, res) => {
    const {nome, senha, email} = req.body
    if(!nome || !senha || !email){
        return res.status(404).send({message: "Preencha todos os dados!"})
    }
    try {
        const newUser = {nome, email, senha, role: 'normal'}
        const user = await User.create(newUser)

        const novoCarrinho = {usuarioId: user._id, itens: []}
        const carrinho = await Carrinho.create(novoCarrinho)

        return res.status(200).send({message: "Usuario criado!", user, infoCarrinho: carrinho})
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})

router.post('/criar-admin', async (req, res) => {
    const {nome, senha, email} = req.body
    if(!nome || !senha || !email){
        return res.status(404).send({message: "Preencha todos os dados!"})
    }
    try {
        const newUser = {nome, email, senha, role: 'admin'}
        const user = await User.create(newUser)

        return res.status(200).send({message: "Admin criado!", user})
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})

router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find({})
        if(!allUsers){
            return res.status(404).send({message: "Usuarios não encontrados!"})
        }

        return res.status(200).send({message: "Usuarios encontrados!", count: allUsers.length, allUsers})
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const user = await User.findById(id)
        if(!user){
            res.status(404).send({message: "Usuario não encontrado!"})
        }

        return res.status(200).send({message: "Usuario encontrado!", user})
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})

router.patch('/:id', async (req, res) => {
    const {id} = req.params
    const {nome, senha, email} = req.body
    if(!nome && !senha && !email){
        return res.status(400).send({message: "Preencha um campo"})
    }
    try {
      const userId = await User.findById(id)
      if(!userId){
        return res.status(404).send({message: "Usuario não encontrado!"})
      }

      const userUpdate = {
        nome: nome !== undefined ? nome : userId.nome,
        senha: senha !== undefined ? senha : userId.senha,
        email: email !== undefined ? email : userId.email
      }
      const updatedUser = await User.findByIdAndUpdate(id, userUpdate, {new: true})
      return res.status(200).send({message: "Usuario Atualizado", updatedUser})
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const deleteUser = await User.findByIdAndDelete(id)
        if(!deleteUser){
            return res.status(404).send("Usuario não encontrado!")
        }

        return res.status(200).send({message: "Usuario deletado com sucesso!"})
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})

module.exports = router