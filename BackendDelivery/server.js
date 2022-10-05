const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport')
var expressSession = require("express-session");
 
app.use(expressSession({
    secret: "This is one hell of a secret",
    resave: false,
    saveUninitialized: false
  }));
 
 
/*
* RUTAS
*/
const users = require('./routes/usersRoutes');
 
const port = process.env.PORT || 3001;
 
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
 
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
 
app.disable('x-powered-by');
 
app.set('port', port);
 
/*
* LLAMANDO A LAS RUTAS
*/
users(app);
 
server.listen(3001, '192.168.0.17' || 'localhost', function() {
    console.log('Aplicacion de NodeJS ' + port + ' Iniciada...')
});

app.get('/',(req, res) => {
    res.send('Ruta raiz')
});
app.get('/test',(req, res) => {
    res.send('esta es una ruta de testeo')
});
 
// ERROR HANDLER
app.use((err, req, res, next) => {
    console.log(err);
    res.status(err.status || 500).send(err.stack);
});
 
module.exports = {
    app: app,
    server: server
}
 
// 200 - ES UN RESPUESTA EXITOSA
// 404 - SIGNIFICA QUE LA URL NO EXISTE
// 500 - ERROR INTERNO DEL SERVIDOR