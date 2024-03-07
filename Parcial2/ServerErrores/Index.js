const express = require("express");
const app = express();


app.get('/carros', (req, res) => {

    if (tru)
    {
        res.send('Constestando a Get desde Server Express, ruta carros');
    }
    else {res.send('Constestando a Get desde Server Express, ruta carros');
    }
});

app.get('/motos', (req, res) => {
// res.send('Constestando a Get desde Server Express, ruta motos');
    try {
    throw new errofr("Ocurrió un error")
    }
    catch(e){
    next(e)
    }
});

app.use((req, res, next) => {
res.status(404).send("Recurso no encontrado");
});

app.use((err, req, res, next) => {
    res.status(500).send(err.message);
    });

app.listen(3000, () => {
console.log('Example app listening on port 3000!');
});