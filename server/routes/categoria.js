const express = require('express');
const _ = require('underscore');

let {verificaToken} = require('../middlewares/autentificacion');
const Categoria = require('../models/categoria');

const app = express();

app.get('/categoria',verificaToken,(req,res) => {
    Categoria.find({})
    //  Para hacer un populate seleccionamos la propiedad usuario que hace referencia a la coleccion Usuario
    // Ponemos en el segundo argumento las propiedades que queremos que se reflejen en la respuesta y no asi todas las propiedades 
        .populate('usuario','nombre email')
        .sort('nombre')
        .exec( (err, categorias) => {
        if(err) {
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.status(200).json({
            ok: true,
            categorias
        })
    })
});

app.get('/categoria/:id', (req,res) => {
    let id = req.params.id;
    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            })
        }

        res.status(200).json({
            ok:true,
            categoriaDB
        })
    })
});

app.post('/categoria',verificaToken,(req,res) => {
    let categoria = new Categoria({
        nombre: req.body.nombre,
        usuario: req.usuario._id
    })

    categoria.save((err, categoriaDB) => {
        if (err) {
            res.status(500).json({
                ok:false,
                err
            })
        }

        res.status(200).json({
            ok:true,
            categoriaDB
        })
    });

});

app.put('/categoria/:id', (req,res)=>{
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre']);
    Categoria.findByIdAndUpdate(id,body,{new: true},(err,categoriaDB)=>{
        if(err) {
            return res.status(400).json({
                ok:false,
                err
            });
        }

        res.status(200).json({
            ok:true,
            categoriaDB
        })
    })
});

app.delete('/categoria/:id', (req,res) => {
    let id = req.params.id;

    Categoria.findByIdAndUpdate(id,{estado: false},{new: true},(err, categoriaDB) =>{
        if (err) {
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.status(200).json({
            ok:true,
            categoriaDB
        })
    })
});


module.exports = app;