const express = require('express')
const Carrinho = require('../models/carrinhoModel.js')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const carrinhos = await Carrinho.find({})
        if(!carrinhos){
            return res.status(400).send({message: "Erro ao buscar carrinhos!"})
        }
        return res.status(200).send({message: "Carrinhos!", count: carrinhos.length, data: carrinhos})
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const carrinho = await Carrinho.findById(id)
        if(!carrinho){
            return res.status(400).send({message: "Carrinho não encontrado!"})
        }
        return res.status(200).send({message: "Carrinho encontrado!", data: carrinho})
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})

router.patch('/:id', async (req, res) => {
    const {id} = req.params
    try {
        
    } catch (error){
        return res.status(500).send({message: error.message})
    } 
})

module.exports = router