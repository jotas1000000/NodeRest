require('./config/config');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); 
// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'));

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