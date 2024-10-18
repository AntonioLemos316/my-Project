const express = require('express')
const Carrinho = require('../models/CarrinhoModel.js')
const Camisa = require('../models/CamisaModel.js')

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const carrinhos = await Carrinho.find({})
        if(!carrinhos){
            return res.status(400).send({message: "Erro ao buscar carrinhos!"})
        }
        return res.status(200).send({message: "Carrinhos!", count: carrinhos.length, carrinhos})
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
        return res.status(200).send({message: "Carrinho encontrado!", carrinho})
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})

router.patch('/adicionar/:carrinhoId', async(req, res) => {
    const {carrinhoId} = req.params
    const {camisaId} = req.body

    if(!camisaId){
        return res.status(404).send({message: "Passe um id de camisa valida!"})
    }

    try {
        const carrinho = await Carrinho.findById(carrinhoId)
        if(!carrinho){
            return res.status(404).send({message: "Carrinho não encontrado!"})
        }

        const camisa = await Camisa.findById(camisaId)
        if(!camisa){
            return res.status(404).send({message: "Camisa não encontrada!"})
        }

        const camisaExiste = carrinho.itens.find(c => c.camisaId.toString() === camisaId)
        if(camisaExiste){
            return res.status(400).send({ 
                message: "A camisa já está no carrinho",
                url: `http://localhost:3000/carrinhos/aumentar/${carrinhoId}` 
            })
        }

        carrinho.itens.push({camisaId, quantidade: 1, preco: camisa.preco})

        const carrinhoAtualizado = await carrinho.save()
        return res.status(200).send({message: "Item adicionado", carrinhoAtualizado, preco: camisa.preco})
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
})

router.patch('/aumentar/:carrinhoId', async (req, res) => {
    const { carrinhoId } = req.params;
    const { camisaId, quantidade } = req.body;

    if (quantidade <= 0) {
        return res.status(400).send({ message: "Quantidade deve ser válida." });
    }

    try {
        const carrinho = await Carrinho.findById(carrinhoId);
        if (!carrinho) {
            return res.status(404).send({ message: "Carrinho não encontrado" });
        }

        const camisa = await Camisa.findById(camisaId)
        if (!camisa) {
            return res.status(404).send({ message: "Camisa não encontrada" });
        }

        const itemExistente = carrinho.itens.find(c => c.camisaId.toString() === camisaId);
        if (!itemExistente) {
            return res.status(404).send({message: "Camisa não econtrada!"})
        } 

        itemExistente.quantidade += quantidade
        console.log(itemExistente.quantidade)

        const total = carrinho.itens.reduce((acc, item) => {
            return acc + (item.preco * item.quantidade);
        }, 0);

        await carrinho.save();

        return res.status(200).send({ message: "Carrinho atualizado!", carrinho, total: total.toFixed(2)});
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});


router.patch('/diminuir/:carrinhoId', async (req, res) => {
    const { carrinhoId } = req.params;
    const { camisaId, quantidade } = req.body;

    if (quantidade <= 0) {
        return res.status(400).send({ message: "Quantidade deve ser válida." });
    }

    try {
        const carrinho = await Carrinho.findById(carrinhoId);
        if (!carrinho) {
            return res.status(404).send({ message: "Carrinho não encontrado" });
        }

        const camisa = await Camisa.findById(camisaId)
        if (!camisa) {
            return res.status(404).send({ message: "Camisa não encontrada" });
        }

        const itemExistente = carrinho.itens.find(c => c.camisaId.toString() === camisaId);
        if (!itemExistente) {
            return res.status(404).send({message: "Camisa não econtrada!"})
        } 

        itemExistente.quantidade -= quantidade;

        if (itemExistente.quantidade < 1) {
            return res.status(400).send({
                message: "Você precisa de pelo menos 1 camisa.",
                url: `http://localhost:3000/carrinhos/remover/${carrinhoId}`
            });
        }

        const total = carrinho.itens.reduce((acc, item) => {
            return acc + (item.preco * item.quantidade);
        }, 0);
        
        await carrinho.save();

        return res.status(200).send({ message: "Carrinho atualizado!", carrinho, total: total.toFixed(2)});
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

router.delete('/:carrinhoId/remover/:camisaId', async (req, res) => {
    const {carrinhoId, camisaId} = req.params

    try {
        const carrinho = await Carrinho.findById(carrinhoId);
        if (!carrinho) {
            return res.status(404).send({ message: "Carrinho não encontrado!" });
        }

        const itemIndex = carrinho.itens.findIndex(c => c.camisaId.toString() === camisaId);
        if (itemIndex === -1) {
            return res.status(404).send({ message: "Camisa não encontrada no carrinho!" });
        }

        // Remove a camisa do carrinho
        carrinho.itens.splice(itemIndex, 1);
        await carrinho.save();

        return res.status(200).send({ message: "Camisa removida do carrinho!", carrinho });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
})

module.exports = router