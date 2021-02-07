require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); 
// parse application/json
app.use(bodyParser.json());

/* habilitar la carpeta publica */

/* app.use(express.static(__dirname + '../public')); No funciona */
app.use(express.static(path.resolve(__dirname,'./public')));
console.log(path.resolve(__dirname,'./public'));
/*Rutas */
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  },(err)=>{
    if(err) throw new Error('Hubo un problema con la coneccion a base de datos', err)
    console.log('Base de datos conectada');
});

app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo puerto ${process.env.PORT}`);
})