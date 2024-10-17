const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CompraSchema = new Schema({
    usuarioId: { type: Schema.Types.ObjectId, ref: 'User' },
    itens: [{ type: Schema.Types.ObjectId, ref: 'Camisa' }],
    dataCompra: { type: Date, default: Date.now },
    total: Number,
    status: {
        type: String,
        enum: ['pendente', 'concluída', 'cancelada'],
        default: 'pendente'
    }
});

const Compra = mongoose.model('Compra', CompraSchema);
module.exports = Compra;
