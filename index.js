const { conection } = require("./database/conection");
const express = require("express");
const cors = require("cors");

//Initialize api
console.log("El bicho <<<<<<<< Messi");

//Conect to the data base
conection();

//Crear servidor de Node
const app =
  express(); /*atras vez de esto se van a ejeutar metodos que son un midelWord, peticiones del sevidor*/
const port = 3900;

//Configuara Cors
app.use(cors()); /*Ejecutarse antes de que se ejecute una ruta*/

// Convertir body  a objeto js
app.use(
  express.json()
); /*Convertir directamente los datos a un obj js     Recibir datos con conect-type de forma raw o json*/
app.use(express.urlencoded({ extended: true })); //Recibiendo en URL code

//Crear Rutas
const rutas_articulo = require("./routes/article");
//Cargo las Rutas
app.use("/api", rutas_articulo);

//Rutas Pruebas

app.get("/", (req, res) => {
  return res.status(200).send(`
    <h1>Hellow this is my Nodejs page</h1>
  `);
});

//Crear servidor y escuchar peticiones http
app.listen(port, () => {
  console.log("Server running in the port " + port);
});
