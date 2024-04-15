const express = require("express");
const jwt = require('jsonwebtoken');
const path =require('path');
const app = express();
app.use(express.json());

app.post('/login',function(req,res,next){
    var cert = fs.readFileSync(path.join(__dirname,'/llaves/publica.pem'));
    var token = jsonwebtoken.sign(req.body, llavePrivada),{algo};
    console.log(token);
    res.json(token);
});

app.get('/sistema',verificarToken,function(req,res,next){
    res.json({mensaje:"Acceso concedido a ruta sistema"})
})