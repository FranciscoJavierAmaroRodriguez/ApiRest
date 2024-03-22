const express = require("express");
const app = express();
const mysql = require("mysql2/promise");
const {check, validationResult} = require('express-validator');
app.use(express.json());

//Consulta
app.get("/usuario", async (req,res,next)=>{
    sql ='SELECT * FROM alumnos';
    if (typeof req.query.id !='undefined'){
    sql = sql + ` where id = "${req.query.id}"`;
    }

    try{
    connection =await mysql.createConnection({ host: 'localhost', user:'root', database: 'APIREST', password: '130606'});
    var [rows,fields]=await connection.query(sql);
    connection.end();
    
    (rows.length > 0) ? res.send(rows) : res.status(404).json({Eror: "Datos no encontrados"});

}
catch(err){
        res.send(err.code+` / `+err.message);
    }
});

//Update
app.put("/usuario", async (req, res) => {
    try {
        connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'APIREST', password: '130606' });
        sql =`UPDATE alumnos SET id ="${req.query.idNuevo}"` + ` where id = "${req.query.id}"`;
        result= await connection.query(sql);
        await connection.end();
        if (result.affectedRows !==0) {
            res.status(200).json({ message: "Nombre actualizado con exito" });
        } else {
            res.status(404).json({ error: "No se encontró el nombre" });
        }
    } catch(err){
        res.send(err.code+` / `+err.message);
    }
});

//Añadir isAlpha
app.post('/usuario', check('nombre').isAlpha(), async(req,res) => {
    try {
        connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'APIREST', password: '130606' });
        sql =`INSERT INTO alumnos (id, nombre) VALUES ("${req.query.id}","${req.query.nombre}")`;
        var [rows,fields] = await connection.query(sql);
        await connection.end();
        res.status(201).json({ message: "Nuevo alumno agregado correctamente" });
    
   result = validationResult(req);
        if (result.isEmpty()) {
            console.log("Validacion OK");
        } else {
            console.log("Error de validacion");
        }
    } catch(err){
        res.send(err.code+` / `+err.message);
    
    }
});

//Borrar
app.delete("/usuario", async (req, res) =>{
    try{
        connection= await mysql.createConnection({ host: 'localhost', user: 'root', database: 'APIREST', password: '130606' });
        sql =`DELETE FROM alumnos WHERE id = "${req.query.id}"`; 
        var [rows,fields] = await connection.query(sql);
        await connection.end();
        res.status(201).json({ message: "Nombre borrado con exito"});
    } catch(err){
        res.send(err.code+` / `+err.message);
    }
})

app.listen(3000,()=>{
    console.log("Servidor Express escuchando en puerto 3000");
});