const mongoose = require('mongoose');
const User = require('../models/userModel.js'); // Ajuste o caminho conforme necessário

const DB_URI = 'mongodb://127.0.0.1:27017/eCommerceCamisas'; // Substitua pela sua URI do MongoDB

const criarAdmin = async () => {
    try {
        // Conectar ao banco de dados
        await mongoose.connect(DB_URI);
        
        // Verificar se já existe um administrador
        const existeAdmin = await User.findOne({ role: 'admin' });
        if (existeAdmin) {
            console.log('Administrador já existe.');
            return; // Sai do script se já existir
        }

        // Criar um novo administrador
        const primeiroAdmin = new User({
            nome: 'Admin',
            senha: '123', // Lembre-se de hashear a senha antes de salvar
            email: 'admin@example.com',
            role: 'admin'
        });

        // Salvar o novo administrador no banco de dados
        await primeiroAdmin.save();
        console.log('Admin criado com sucesso');
    } catch (err) {
        console.error('Erro ao criar admin:', err);
    } finally {
        // Fechar a conexão com o banco de dados
        mongoose.connection.close();
    }
};

// Executar a função
criarAdmin();
