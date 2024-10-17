const express = require('express')
const Carrinho = require('../models/carrinhoModel.js')
const Camisa = require('../models/camisaModel.js')

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

router.patch('/aumentar/:id', async (req, res) => {
    const { id } = req.params;
    const { camisaId, quantidade } = req.body;

    if (!camisaId || quantidade <= 0) {
        return res.status(400).send({ message: "Erro no id da camisa ou na quantidade que deve ser válida." });
    }

    try {
        const carrinho = await Carrinho.findById(id);
        if (!carrinho) {
            return res.status(404).send({ message: "Carrinho não encontrado" });
        }

        const camisa = await Camisa.findById(camisaId);
        if (!camisa) {
            return res.status(404).send({ message: "Camisa não encontrada" });
        }

        const itemExistente = carrinho.itens.find(item => item.camisaId.toString() === camisaId);
        if (itemExistente) {
            itemExistente.quantidade += quantidade;
            itemExistente.preco = camisa.preco; // Atualiza o preço
        } else {
            carrinho.itens.push({ camisaId, quantidade, preco: camisa.preco }); // Adiciona o preço
        }

        await carrinho.save();
        return res.status(200).send({ message: "Carrinho atualizado!", data: carrinho });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});


router.patch('/diminuir/:id', async (req, res) => {
    const {id} = req.params
    const {camisaId, quantidade} = req.body
    if (!camisaId || quantidade <= 0) {
        return res.status(400).send({ message: "Erro no id da camisa ou na quantidade que deve ser válida." });
    }
    try {
        const carrinho = await Carrinho.findById(id)
        if(!carrinho){
            return res.status(404).send({message: "Erro carrinho não encontrado"})
        }
        const itemExistente = carrinho.itens.find(item => item.camisaId.toString() === camisaId)
        if (itemExistente) {
            itemExistente.quantidade -= quantidade;
            if (itemExistente.quantidade < 0) {
                itemExistente.quantidade = 0
                return res.status(400).send({ message: "A quantidade não pode ser menor que zero." })
            }
        } else {
            return res.status(404).send({ message: "Item não encontrado no carrinho." })
        }
        await carrinho.save()
        return res.status(200).send({ message: "Carrinho atualizado!", data: carrinho })
    } catch (error){
        return res.status(500).send({message: error.message})
    } 
})

module.exports = router