'use stict'

//Cargar modulos de node para crear servidor
const express = require('express');
const boydParser = require('body-parser');

//Ejecutar express (http)
const app = express();

//Cargar ficheros rutas
let article_routes = require('./routes/article');
//Middlewares
app.use(boydParser.urlencoded({extended:false}));
app.use(boydParser.json());

//CORS
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Anadir prefijos a rutas
app.use('/api',article_routes);

//Rutas API REST



//Exportar modulod (fichero actual)

module.exports = app;
