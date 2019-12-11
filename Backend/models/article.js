'use stict'


const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AticleSchema = Schema({
    name: String,
    price: Number,
    date: { type: Date, default: Date.now},
    image: String,
    title: String,
    description: String,
});


module.exports = mongoose.model('Article',AticleSchema);
//articles --> guarda documentos de este tipo y con estructuras dentro de la coleccion
