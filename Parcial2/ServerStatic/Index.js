const express = require("express");
const app = express();
const path = require("path");
const basicAuth = require('express-basic-auth')

app.use(basicAuth({
    users: { 'admin': '123' }
}))

app.get('/', (req, res) => {
res.send('Constestando a Get desde ServExpress, Hola mundo!');
});

app.use("/public", express.static( path.join(__dirname, `public`)));

app.listen(3000, () => {
console.log('Example app listening on port 3000!');
});