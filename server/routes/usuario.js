const express = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const app = express();


app.get('/usuario', (req, res)=>{

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Usuario.find({estado: true}, 'nombre email role estado img').skip(desde).limit(limite).exec((err,usuarios) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        
        Usuario.countDocuments({estado: true}, (err, conteo) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                usuarios,
                conteo
            })
        });
    })
});

app.post('/usuario', (req, res)=>{

    let usuario = new Usuario({
        nombre: req.body.nombre,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role
    });

    usuario.save((err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json(usuarioDB);
    });
});

app.put('/usuario/:id', (req, res)=>{
    let id = req.params.id;
    /* let body = req.body; */
    /*Con pick seleccionamos que propiedades se podran actualizar */
    let body = _.pick(req.body,['nombre', 'email','role', 'img', 'estado']);
    /*runValidators sirve en este caso para que los enums para role se obedezcan */
    Usuario.findByIdAndUpdate(id , body,{new: true, runValidators: true},(err, usuarioDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        res.status(200).json({
            ok: true,
            usuarioDB
        });
    })
});

app.delete('/usuario/:id', (req, res)=>{
    let id = req.params.id;

    /* Usuario.findByIdAndRemove(id, (err, usuarioBorrado) => { */
        Usuario.findByIdAndUpdate(id,{estado:false},(err, usuarioDeleteVirtual) =>{
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }

        if (usuarioDeleteVirtual == null) {
            return res.status(400).json({
                ok: false,
                error:{
                    message: 'Usuario no encontrado'
                }
            });
        }

        res.json({
            ok: true,
            usuarioDeleteVirtual
        })
    })

});


module.exports = app;