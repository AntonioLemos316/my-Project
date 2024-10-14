const express = require('express')
const User = require('../models/userModel.js')
const Camisa = require('../models/camisaModel.js')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find({})
        if(!allUsers){
            return res.status(404).send({message: "Usuarios não encontrados!"})
        }
        return res.status(200).send({message: "Usuarios encontrados", count: allUsers.length, data: allUsers})
    } catch (error) {
        return res.status(500).send({message: "Erro geral ao buscar usuarios"})
    }
})

router.post('/', async (req, res) => {
    const {nome, email, senha} = req.body
    if(!nome || !email || !senha){
        return res.status(404).send({message: "Preencha todos os dados!"})
    }
    const newUser = {nome, email, senha}
    try {
        const user = await User.create(newUser)
        return res.status(200).send({message: "Criado!", data: user})
    } catch (error) {
        return res.status(500).send({message: error.message})
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
        console.error("Erro:", error)
        return res.status(500).send({message: "erro geral"})
    }
})

module.exports = router