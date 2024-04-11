const express = require ('express');
const https = require('node:https');
const fs = require('node:fs');
const path =require('path');
const app = express();

const options = {
    key: fs.readFileSync(path.join(__dirname,'certificados/key.pem')),
    cert: fs.readFileSync(path.join(__dirname,'certificados/cert.pem')),
  };

app.get('/',(req,res)=>{
    res.json({mensaje:"servidor express"})
})

https.createServer(options,app).listen(8080,()=>{
    console.log("Servidor express escuchando puerto 8080")
})