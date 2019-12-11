'use strict'


const mongoose = require('mongoose');
const app = require('./app');
const port = 3900;

mongoose.set('useFindAndModify',false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://maru:1234@clusterprueba01-knt6b.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true})
    .then(()  =>{
        console.log('Conexion inciada correctamente!!');

        //Crear servidor y escuchar peticiones http

        app.listen(port,() => {
            console.log('Servidor corriendo en http://localhost:'+port);

        });

});
