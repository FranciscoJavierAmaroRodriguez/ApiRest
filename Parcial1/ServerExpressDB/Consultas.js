const express = require("express");
const app = express();
const mysql = require("mysql2/promise");

app.use(express.json());

//Consulta
app.get("/usuario", async (req,res,next)=>{
    sql ='SELECT * FROM alumnos';
    if (typeof req.query.nombre !='undefined'){
    sql = sql + ` where nombre = "${req.query.nombre}"`;
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
        sql =`UPDATE alumnos SET nombre ="${req.query.nombreNuevo}"` + ` where nombre = "${req.query.nombre}"`;
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

//Añadir
app.post("/usuario", async (req, res) => {
    try {
        connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'APIREST', password: '130606' });
        sql =`INSERT INTO alumnos (nombre) VALUES ("${req.query.nombre}")`;
        var [rows,fields] = await connection.query(sql);
        await connection.end();
        res.status(201).json({ message: "Nuevo nombre agregado correctamente" });
    } catch(err){
        res.send(err.code+` / `+err.message);
    }
});

//Borrar
app.delete("/usuario", async (req, res) =>{
    try{
        connection= await mysql.createConnection({ host: 'localhost', user: 'root', database: 'APIREST', password: '130606' });
        sql =`DELETE FROM alumnos WHERE nombre = "${req.query.nombre}"`; 
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