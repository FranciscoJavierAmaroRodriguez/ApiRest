const express = require("express");
const app = express();
const path = require('path');
const mysql = require("mysql2/promise");
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { SwaggerTheme, SwaggerThemeNameEnum } = require('swagger-themes');
const theme = new SwaggerTheme();

const options = {
    explorer: true,
    customCss: theme.getBuffer(SwaggerThemeNameEnum.DARK)
  };

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Empleados',
            version: '1.0.2',
            description: 'Api que tiene una lista simple de alumnos'
    },
        servers:[
            {url: "http://localhost:3000"}
        ], 
    },
    apis: [`${path.join(__dirname,"./Consultas.js")}`],
    };

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs,options));

app.use("/api-docs-json",(req,res)=>{
    res.json(swaggerDocs);
})

app.use(express.json());
/**
 * @swagger
 * components:
 *   schemas:
 *     User:      
 *       type: 
 *         object
 *       properties:
 *         id:
 *           type: string
 *           example: 21
 *         name: 
 *           type: string
 *           example: Gerardo
 */

/**
 * @swagger
 * tags:
 * - name: Alumnos
 *   description: Procesos de Alumnos
 * paths:
 *   /lista:
 *     get:
 *       tags:     
 *       - Alumnos
 *       description: Lista de alumnos
 *       responses:
 *         200:
 *           description: Regresa a alumnos.
 *           type: json
 */
//Consulta
app.get("/lista", async (req,res,next)=>{
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
 * /actualizar:
 *   put:
 *     tags:    
 *     - Alumnos
 *     description: Actualiza el registro de alumos.
 *     responses:
 *       200:
 *         description: Cambia el nombre de un alumno mediante el ID.
 *         type: json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 */
//Update
app.put("/actualizar", async (req, res) => {
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
 * /agregar:
 *   post:
 *     tags:    
 *     - Alumnos
 *     description: Añade alumnos a la base de datos
 *     responses:
 *       200:
 *         description: Registra a alumnos. El registro lleva ID y nombre
 *         type: json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 */
//Añadir
app.post("/agregar", async (req, res) => {
    try {
        connection = await mysql.createConnection({ host: 'localhost', user: 'root', database: 'APIREST', password: '130606' });
        sql =`INSERT INTO alumnos (id, nombre) VALUES ("${req.query.id}","${req.query.nombre}")`;
        var [rows,fields] = await connection.query(sql);
        await connection.end();
        res.status(201).json({ message: "Nuevo Alumno agregado correctamente" });
    } catch(err){
        res.send(err.code+` / `+err.message);
    }
});


/**
 * @swagger
 * /eliminar:
 *   delete:
 *     tags:    
 *     - Alumnos
 *     description: Elimina Alumnos en base al ID
 *     responses:
 *       200:
 *         description: Borra Alumnos.
 *         type: json
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 */
//Borrar
app.delete("/eliminar", async (req, res) =>{
    try{
        connection= await mysql.createConnection({ host: 'localhost', user: 'root', database: 'APIREST', password: '130606' });
        sql =`DELETE FROM alumnos WHERE id = "${req.query.id}"`; 
        var [rows,fields] = await connection.query(sql);
        await connection.end();
        res.status(201).json({ message: "Alumno eliminado con exito"});
    } catch(err){
        res.send(err.code+` / `+err.message);
    }
})

app.listen(3000,()=>{
    console.log("Servidor Express escuchando en puerto 3000");
});
