require('./config/config');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); 
// parse application/json
app.use(bodyParser.json());


app.get('/usuario', (req, res)=>{
    res.json();
});

app.post('/usuario', (req, res)=>{
    res.json(req.body);
});

app.put('/usuario', (req, res)=>{
    res.json();
});

app.delete('/usuario', (req, res)=>{
    res.json();
});


app.listen(process.env.PORT, () => {
    console.log(`servidor corriendo puerto ${process.env.PORT}`);
})