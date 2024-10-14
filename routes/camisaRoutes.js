// Chamando express e Camisa
const express = require('express');
const Camisa = require('../models/camisaModel.js');

// Atribuindo a router o metodo Router()
const router = express.Router()

// GET verbo http utilizado para BUSCAR, LISTAR ou LER
router.get('/', async (req, res) => {
    try {
        const allCamisas = await Camisa.find({})
        if(!allCamisas){
            return res.status(404).send({message: "Erro ao buscar camisas!"})
        }
        return res.status(200).send({message: "Camisas", data: allCamisas})
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

// POST verbo http utilizado para CRIAR 
router.post('/', async (req, res) => {
    const {marca, tamanho, cor, preco} = req.body
    if(!marca || !tamanho || !cor || !preco){
      return res.status(404).send({message: 'Preencha todos os dados!'})
    }
    const novaCamisa = {marca, tamanho, cor, preco}
    try {  
        const camisa = await Camisa.create(novaCamisa)
        if(!camisa){
            return res.status(404).send({message: "Erro ao criar!"})
        }
        return res.status(200).send({message: 'Criada!', data: camisa})
    } catch (error) { 
        return res.status(500).send({message: error.message})
    }
})

// GET com :id serve para BUSCAR, LISTAR ou LER um arquivo
router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const camisa = await Camisa.findById(id)
        if(!camisa){
            return res.status(404).send({message: "Erro ao buscar camisa!"})
        }
        return res.status(200).send({message: "Camisa", data: camisa})
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

// PATCH verbo http utilizado para ATUALIZAR um ou mais atributo
router.patch('/:id', async (req, res) => {
    const {id} = req.params
    const {marca, tamanho, cor, preco} = req.body
    const atualizarCamisa = {marca, tamanho, cor, preco}
    if(!marca && !tamanho && !cor && !preco){
      return res.status(404).send({message: 'Preencha pelo menos um campo!'})
    }
    try {
        const camisa = await Camisa.findByIdAndUpdate(id, atualizarCamisa, { new: true })
        if(!camisa){
            return res.status(404).send({message: "Erro ao atualizar!"})
        }
        return res.status(200).send({message: 'Atualizada!', data: atualizarCamisa})
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

// DELETE verbo http utilizado para DELETAR e APAGAR
router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const camisa = await Camisa.findByIdAndDelete(id)
        if(!camisa){
            return res.status(404).send({message: "Erro ao deletar!"})
        }
        return res.status(200).send({message: "Deletada!"})
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

// Exportando router para ser usado em index.js
module.exports = router