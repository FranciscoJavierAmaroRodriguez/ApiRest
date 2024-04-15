const express = require("express");
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

const claveSecreta = "clave";

app.post("/login", (req, res, next) => {
    const { username, password } = req.body;
    const token = jwt.sign({ username,password }, claveSecreta);
    res.json({ token });
});

app.get('/alumnos', validarToken, (req, res, next) => {
    console.log("Token válido");
    res.json({ mensaje: "Acceso permitido" });
});

async function validarToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
        console.log("token no proporcionado");
        return res.status(401).json({ error: "Token no proporcionado" });
    }
    try {
        const decoded = jwt.verify(token.split(" ")[1], claveSecreta);
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ error: "Token inválido" });
        console.log("Token inválido");
    }
}

app.get('/', (req, res) => {
    res.json({ mensaje: "Servidor Express" });
});

app.listen(3000, () => {
    console.log("Servidor Express escuchando en puerto 3000");
});
