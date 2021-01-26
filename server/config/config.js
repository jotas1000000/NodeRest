/*
Puerto
*/

process.env.PORT = process.env.PORT || 7777;

/*Vencimiento del token */
process.env.CADUCIDAD_TOKEN = 60*60*24*30;

/*SEED de autentificacion */
process.env.SEED =  process.env.SEED || 'este-es-el-secret-de-desarrollo';

/*Entorno */

process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

/*Base de datos */

let urlDB;

if(process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
}else {
    /*SE ha guardado todas las credenciales de la base de datos en MOngoDb en una variable de entorno de heroku con >> heroku config:set MONGO_URI="mongo+srv:...." 
    y rescatamos ese valor con process.env.MONGO_URI */
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;