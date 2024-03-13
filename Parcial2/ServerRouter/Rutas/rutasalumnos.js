const express = require('express');
const rutasalumnos = express.Router();


rutasalumnos.get('/',(req,res,next)=>{res.send("Respondiendo a get router()")})
rutasalumnos.post('/',(req,res,next)=>{res.send("Respondiendo a post router()")})
rutasalumnos.patch('/',(req,res,next)=>{res.send("Respondiendo a patch router()")})
rutasalumnos.delete('/',(req,res,next)=>{res.send("Respondiendo a delete router()")})

module.exports = rutasalumnos;