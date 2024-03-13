const express = require ('express');
const app = express();
const rutasalumnos =require("./Rutas/rutasalumnos.js");

app.use('/usuario',rutasalumnos);

app.use((req, res, next) => {
    res.status(404).send("Recurso no encontrado");
    });
    
app.use((err, req, res, next) => {
    res.status(500).send(err.message);
    });
    
app.listen(3000, () => {
console.log('Example app listening on port 3000!');
});
