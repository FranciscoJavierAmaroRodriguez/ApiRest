const express = require("express");
const app = express();
const mysql = require("mysql2/promise");



// //Funcion de middleware propia
// app.use((req,res,next)=>{
//     console.log("Peticion al server"+new Date());
//     next();
// })

// const connection = mysql.createConnection({
//     host: 'localhost', user:'root', database: 'APIREST',password: '130606',
// })

// app.get("/usuario/:Alumnos",(req, res, next) => {
//     connection.query('SELECT * FROM Alumnos',
//         function (err,results, fields){
//             console.log(results)
//         }
//     )
// })

app.get("/usuario", async (req,res,next)=>{
    sql ='SELECT * FROM Alumnos';
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



app.listen(3000,()=>{
    console.log("Servidor Express escuchando en puerto 3000");
});