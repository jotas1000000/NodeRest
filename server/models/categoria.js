const mongoose = require('mongoose');
const mySchema = mongoose.Schema;

const CategoriaSchema = mySchema({
    nombre : {
        type: String,
        required: [true, 'EL nombre es necesario']
    },
    /*Para hacer un populate aqui ponemos como referencia lel nombre de la coleccion es este Caso Usuario*/
    usuario: {
        type: mongoose.ObjectId,
        ref: 'Usuario',
        required: [true, 'Estar logeado primero']
    },
    estado: {
        type: Boolean,
        default: true
    }
})


module.exports = mongoose.model('Categoria',CategoriaSchema);