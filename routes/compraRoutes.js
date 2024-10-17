const express = require('express');
const Compra = require('../models/compraModel.js');
const Carrinho = require('../models/carrinhoModel.js');

const router = express.Router();

// Obter histórico de compras
router.get('/', async (req, res) => {
    try {
        const compras = await Compra.find({}).populate('usuarioId').populate('itens');
        return res.status(200).send({ message: "Compras encontradas!", data: compras });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// Obter uma compra específica
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const compra = await Compra.findById(id).populate('usuarioId').populate('itens');
        if (!compra) {
            return res.status(404).send({ message: "Compra não encontrada!" });
        }
        return res.status(200).send({ message: "Compra encontrada!", data: compra });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// Criar uma nova compra
router.post('/', async (req, res) => {
    const { usuarioId, itens, total } = req.body;
    try {
        const compra = new Compra({ usuarioId, itens, total });
        await compra.save();
        return res.status(201).send({ message: "Compra criada!", data: compra });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

// Atualizar o status da compra (ex: cancelar)
router.patch('/:id', async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    try {
        const compra = await Compra.findById(id);
        if (!compra) {
            return res.status(404).send({ message: "Compra não encontrada!" });
        }

        compra.status = status;
        await compra.save();
        return res.status(200).send({ message: "Status da compra atualizado!", data: compra });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

router.post('/finalizar/:carrinhoId', async (req, res) => {
    const { carrinhoId } = req.params;

    try {
        const carrinho = await Carrinho.findById(carrinhoId).populate('itens.camisaId');
        if (!carrinho) {
            return res.status(404).send({ message: "Carrinho não encontrado!" });
        }

        const total = carrinho.itens.reduce((acc, item) => {
            const preco = item.camisaId?.preco || 0; // Verifique se camisaId é populado
            return acc + (preco * item.quantidade);
        }, 0);

        const compra = new Compra({
            usuarioId: carrinho.usuarioId,
            itens: carrinho.itens.map(item => item.camisaId), 
            total,
            status: 'concluída'
        });

        await compra.save();
        carrinho.itens = [];
        await carrinho.save();

        return res.status(201).send({ message: "Compra finalizada!", data: compra });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
});





module.exports = router;
