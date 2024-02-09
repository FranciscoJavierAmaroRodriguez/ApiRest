const express = require("express");
const morgan = require("morgan");
const app = express();

//Funcion de Middleware de terceros
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({extended: false}));

//Recibiendo parametros en cadenas de consulta
app.get('/alumnos', (req, res, next) => {
    console.log(req.query);
    res.send('Constestando a Get desde ServExpress, Hola mundo!');
});

//Recibiendo paramaetros como parte de la ruta
app.get("/maestros/:carrera", (req,res,next) =>{
    console.log(req.params.carrera);
    res.send("Constentando a post desde ServExpress");
})

//Recibiendo parametros como Json en el body
app.get("/administrativos", (req,res,next) =>{
    for (const campo in req.body)
    {
        console.log(req.body[campo]);
    }
    res.send("Constentando a post desde ServExpress");
})

//RRecibir un formulario
app.get("/prefectos", (req,res,next) =>{
    console.log(req.body);
    res.send("Contestando a Post desde ServExpress");
});


app.listen(3000, () => {
console.log('Example app listening on port 3000!');
});