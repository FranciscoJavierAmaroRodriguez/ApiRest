const express = require("express");
const jwt = require('jsonwebtoken');
const path =require('path');
const fs =require('fs')
const app = express();
app.use(express.json());

app.post('/login',function(req,res,next){
    var llavePrivada = fs.readFileSync(path.join(__dirname,'/llaves/privada.pem'));
    var token = jwt.sign(req.body, llavePrivada,{algorithm:'RS256'});
    console.log(token);
    res.json(token);
});

app.get('/sistema',authenticateToken,function(req,res,next){
    res.json({mensaje:"Acceso concedido a ruta sistema"})
})

function authenticateToken(req,res,next){
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

if(token ==null) return res.sendStatus(401)

jwt.verify(token, fs.readFileSync(path.join(__dirname,'llaves/publica.pem')),(err,user)=>{
    if(err) return res.sendStatus(403)
    req.user=user
next()
})
}

app.listen(3000, () => {
    console.log("Servidor Express escuchando en puerto 3000");
});