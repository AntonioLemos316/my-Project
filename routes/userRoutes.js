const express = require('express')
const User = require('../models/userModel.js')
const Camisa = require('../models/camisaModel.js')
const Carrinho = require('../models/carrinhoModel.js')

const router = express.Router()

router.post('/cadastrar', async (req, res) => {
    const {nome, senha, email} = req.body
    if(!nome || !senha || !email){
        return res.status(404).send({message: "Preencha todos os dados!"})
    }
    try {
        const newUser = {nome, email, senha, role: 'normal'}
        const user = await User.create(newUser)

        const novoCarrinho = {usuarioId: user._id, itens: []}
        const carrinho = await Carrinho.create(novoCarrinho)

        return res.status(200).send({message: "Criado!", dataUser: user, infoCarrinho: carrinho})
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

        return res.status(200).send({message: "Criado!", data: user})
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

        return res.status(200).send({message: "Usuarios encontrados", count: allUsers.length, data: allUsers})
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

        return res.status(200).send({message: "User", data: user})
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const { camisaId } = req.body
    if(!id || !camisaId){
        return res.status(400).send({message: "Preencha o id do user e id da camisa"})
    }
    try {
        const camisa = await Camisa.findById(camisaId)
        if (!camisa) {
            return res.status(404).send({message: "Erro ao buscar camisa!"})
        }

        const user = await User.findByIdAndUpdate(
            id,
            { $addToSet: { camisa: camisaId } },
            { new: true }
        ).populate({ path: 'camisa' })
        if (!user) {
            return res.status(404).send({ message: "Usuário não encontrado" });
        }

        return res.status(200).send({message: "Adicionada!", data: user})
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