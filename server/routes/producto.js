const express = require('express');
const app = express();

const Producto = require('../models/producto');
const {verificaToken} = require('../middlewares/autentificacion');
const _ = require('underscore');


app.get('/productos', (req,res) => {
    //paginado
    console.log(req.query)
    let desde = Number(req.query.desde);
    let hasta = Number(req.query.hasta);

    Producto.find({}).skip(desde).limit(hasta)
    .populate('usuario','nombre email')
    .populate('categoria','nombre')
    .exec((err,productosDB) => {
        if (err) {
            return res.status(500).json({
                ok:false,
                err
            });
        }

        res.status(200).json({
            ok:true,
            productosDB
        });
    })
});


app.get('/productos/:id', (req,res) => {
    let id = req.params.id;

    Producto.findById(id,(err, productoDB)=>{
        if (err) {
            return res.status(500).json({
                ok:false,
                err
            });
        }

        res.status(200).json({
            ok:true,
            productoDB
        });
    })
});

app.get('/productos/buscar/:termino',(req,res)=>{
    let termino = req.params.termino;
    let rx = new RegExp(termino, 'i');
    Producto.find({nombre: rx})
    .exec((err, productosDB) => {
        if (err) {
            return res.status(500).json({
                ok:false,
                err
            });
        }

        res.status(200).json({
            ok:true,
            productosDB
        });
    })
})

app.post('/productos', verificaToken ,(req,res) => {
    //grabar usuario
    //grabar una cateoria del listado
     let producto = new Producto({
        nombre:req.body.nombre,
        precioUni:req.body.precioUni,
        descripcion:req.body.descripcion,
        categoria:req.body.categoria,
        usuario:req.usuario._id
    }); 

    producto.save((err, productoDB)=>{
        if (err) {
            return res.status(500).json({
                ok:false,
                err
            });
        }

        res.status(200).json({
            ok:true,
            productoDB
        })
    })
});


app.put('/productos/:id', (req,res) => {
    let id = req.params.id;
    let body = _.pick(req.body,['nombre', 'descripcion']);
    Producto.findByIdAndUpdate(id,body,{new: true},(err, productoDB)=>{
        if (err) {
            return res.status(500).json({
                ok:false,
                err
            });
        }

        res.status(200).json({
            ok:true,
            productoDB
        })
    })
});
//delete
app.delete('/productos/:id', (req,res) => {
    let id = req.params.id;
    Producto.findByIdAndUpdate(id,{estado: false},{new: true},(err, productoDB)=>{
        if (err) {
            return res.status(500).json({
                ok:false,
                err
            });
        }

        res.status(200).json({
            ok:true,
            productoDB
        })
    })
});


module.exports = app;
