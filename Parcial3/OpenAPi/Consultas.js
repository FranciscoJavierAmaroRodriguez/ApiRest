const express = require("express");
const app = express();
const path = require('path');
const mysql = require("mysql2/promise");
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Empleados',
            version: '1.0.0',
    },
        servers:[
            {url: "http://localhost:3000"}
        ], 
    },
    apis: [`${path.join(__dirname,"./Consultas.js")}`],
    };

    const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs));

app.use(express.json());

/**
 * @swagger
 * /usuario:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Regresa a alumnos.
 */
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

/**
 * @swagger
 * /usuario:
 *   put:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Actualiza el registro de alumnos.
 */
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


/**
 * @swagger
 * /usuario:
 *   post:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Registra a alumnos. El registro lleva ID y nombre
 */
//Añadir
app.post("/usuario", async (req, res) => {
    try {
        connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'APIREST', password: '130606' });
        sql =`INSERT INTO alumnos (id, nombre) VALUES ("${req.query.id}","${req.query.nombre}")`;
        var [rows,fields] = await connection.query(sql);
        await connection.end();
        res.status(201).json({ message: "Nuevo alumno agregado correctamente" });
    } catch(err){
        res.send(err.code+` / `+err.message);
    }
});


/**
 * @swagger
 * /usuario:
 *   delete:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Borra a alumnos.
 */
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
