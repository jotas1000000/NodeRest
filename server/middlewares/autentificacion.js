const jwt = require('jsonwebtoken');

/*
    Verificar Token
*/

const verificaToken = (req, res , next) => {

    /*Decode es el payload del token */
    let token = req.get('token');
    jwt.verify(token,process.env.SEED, (err, decode) => {

        if ( err ) {
            return res.status(401).json({
                ok:false,
                err
            });
        }

        req.usuario = decode.usuario;
        next();

    });

};


let verificacionAdmin_Role = (req, res, next) => {

    let usuario = req.usuario;

    if (usuario.role !== 'ADMIN_ROLE') {
        res.status(401).json({
            ok: false,
            message: 'Se necesita ser admin para hacer esto'
        });
        return;
    }

    next();

  /*   let role = req.body.role;
    console.log(typeof(req.body.role))
    if( role != 'USER_ROLE' && role !='ADMIN_ROLE') {
        return res.json({
            ok: false,
            err: {
                message:'Este no es un rol de usuario valido' 
            }
        })
    }
    next(); */
}

module.exports = {
    verificaToken,
    verificacionAdmin_Role
}