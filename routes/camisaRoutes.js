// Chamando express e Camisa
const express = require('express');
const Camisa = require('../models/camisaModel.js');

// Atribuindo a router o metodo Router()
const router = express.Router()

// GET verbo http utilizado para BUSCAR, LISTAR ou LER
router.get('/', async (req, res) => {
    // try e catch é um bloco para capturar erros, mais utilizado em questões como consulta ao banco de dados
    try {
        // Buscando todas as camisas atraves da MODEL Camisa com o metodo find
        const allCamisas = await Camisa.find({})
        // Se não tiver camisa retorno um erro 404
        if(!allCamisas.length){
            return res.status(404).send({message: "Erro ao buscar camisas!"})
        }
        // Com a lógica acima caso seja true, significa que encontrou algo e retornamos o que foi encontrado
        return res.status(200).send({message: "Camisas", data: allCamisas})
        // O catch é o erro caso a busca no banco de dados falhe 
    } catch (error) {
        // Podemos retornar um erro 500 que foi no servidor e tbm podemos passar um console.log(error) 
        return res.status(500).send({message: error.message})
    }
})

// POST verbo http utilizado para CRIAR 
router.post('/', async (req, res) => {
    // Usando uma tecnica do ES6 que é desestruturar, para pegar os atributos que vão ser passados no body
    const {marca, tamanho, cor, preco} = req.body
    // Validação se não existir um dos atributos e o retorno do erro com a msg
    if(!marca || !tamanho || !cor || !preco){
      return res.status(404).send({message: 'Preencha todos os dados!'})
    }
    // Atribuindo um objeto literal com os atributos pegos no body
    const novaCamisa = {marca, tamanho, cor, preco}
    // Utilizando o try para uma consulta sensivel no banco de dados
    try {  
        // Fazendo referencia a Model e atraves do metodo create passando a novaCamisa criada acima
        const camisa = await Camisa.create(novaCamisa)
        if(!camisa){
            // Se não tiver camisa retorne um erro
            return res.status(404).send({message: "Erro ao criar!"})
        }
        // Devido a logica se for true ja podemos retornar a msg 'Criada!' e em data a camisa que foi criada
        return res.status(200).send({message: 'Criada!', data: camisa})
    // O catch que vai pegar o erro da consulta a base de dados
    } catch (error) { 
        // msg de erro na consulta
        return res.status(500).send({message: error.message})
    }
})

// GET com :id serve para BUSCAR, LISTAR ou LER um arquivo
router.get('/:id', async (req, res) => {
    // Pegando o id que foi exigido na rota acima atraves do req.params
    const {id} = req.params
    // Try para fazer a consulta ao banco de dados
    try {
        // Metodo findById recebe o id que foi exigido na rota '/:id'
        const camisa = await Camisa.findById(id)
        // Se não tiver camisa retorne um erro 404 e a msg de erro
        if(!camisa){
            return res.status(404).send({message: "Erro ao buscar camisa!"})
        }
        // Se exister a camisa então ela e a msg é exibida
        return res.status(200).send({message: "Camisa", data: camisa})
    // Catch para retornar o erro na consulta ao banco de dados caso aconteça
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

// PATCH verbo http utilizado para ATUALIZAR um ou mais atributo
router.patch('/:id', async (req, res) => {
    // Pegamos o id que foi exigido na rota '/:id'
    const {id} = req.params
    // Pegamos os atributos passado no body da req/requisição que foi será passado pelo usuario
    const {marca, tamanho, cor, preco} = req.body
    // Atribuimos esses atributos a uma constante para gerar um objeto 
    const atualizarCamisa = {marca, tamanho, cor, preco}
    // Validação para exigir pelo menos um campo preenchido para poder atualizar/adicionar a camisa ao user
    if(!marca && !tamanho && !cor && !preco){
      return res.status(404).send({message: 'Preencha pelo menos um campo!'})
    }
    // Try para fazer a consulta sensivel ao banco de dados e poder mostrar um erro
    try {
        // Metodo findByIdAndUpdate que pega a Id passada na rota e os atributos passado na req.body
        // { new: true } é para poder exibir a parte que foi atualizada, sem isso mostra a parte antiga 
        const camisa = await Camisa.findByIdAndUpdate(id, atualizarCamisa, { new: true })
        // Se não existir a camisa da erro
        if(!camisa){
            return res.status(404).send({message: "Erro ao atualizar!"})
        }
        // Se passar na verificação acima, retorna a atualização feita
        return res.status(200).send({message: 'Atualizada!', data: atualizarCamisa})
    // Catch para pegar o erro se aconceter na consulta ao banco de dados
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

// DELETE verbo http utilizado para DELETAR e APAGAR
router.delete('/:id', async (req, res) => {
    // Pegamos o id exigido na rota atraves do {id} = req.params
    const {id} = req.params
    // Try para abrir o tratamento de erros em consultas sensiveis ao banco de dados
    try {
        // Com o findByIdAndDelete pegamos o id passado na rota e excluimos a respectiva camisa
        const camisa = await Camisa.findByIdAndDelete(id)
        // Se não tiver camisa retorna o erro
        if(!camisa){
            return res.status(404).send({message: "Erro ao deletar!"})
        }
        // Se passar na verificação acima retorna o sucesso da operação
        return res.status(200).send({message: "Deletada!"})
    // Catch para pegar o erro caso acontece e podermos exibir no console ou retornar o erro como uma msg
    } catch (error) {
        return res.status(500).send({message: error.message})
    }
})

// Exportando router para ser usado em index.js
module.exports = router