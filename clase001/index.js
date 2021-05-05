//Express : Tiene por objetivo de levantar un servidor web (puerto a gusto) de forma sencilla
const express = require("express");
const logger = require("morgan");
const compression = require("compression");
const bodyParser = require("body-parser");

const products = require("./routes/products");

const app = express();

app.use(compression());
app.use(bodyParser.json());
app.use(logger("dev"));

app.use("/products", products);
// [HTTP] -> METODOS / VERBOS
//localhost: puerto/
/*
app.get("/", (req, res) => {
  //req -> Request -> formularios , cookies , url , session , imagenes
  //res -> Response -> todo lo que el servidor le envia al cliente (informacion)
  //next? -> fn
  console.log("Hi new endpoint");
  // res.end(); Cortar comunicacion
  // res.send(text): Texto plano / HTML : res.send("<h1>Hi from server =D</h1>"); // texto plano
  //res.setHeader("Content-Type", "application/json");
  //res.send(JSON.stringify({ name: "gabbo" }));
  res.json({ name: "gabbo", nickname: "tucosita" });
  // res.sendStatus(200).end();
});
// VERBOS : [GET,POST,PUT,DELETE,PATCH,STATUS]
// Codigos de estado (200 -> ok) (300 -> modificaciones ) (400 -> error de cliente) (500 -> error de servidor )
app.get("/products", (req, res) => {
  console.log("Hi products");
  res.json([
    { id: 1, name: "toalla" },
    { id: 2, name: "Sabanas" },
  ]);
});
**/
/*
//app.post("/products", (req, res) => {
  /*
        req: {
            body: Objeto que contiene la informacion de un formulario (POST),
            params : products/1 1->parametro
            query: Objeto con todos los keys y values de la url ?categoria=baño
            headers
        }
    */

/*
  console.log(req.body);
  res.status(201).json({ message: "Producto dado de alta" });
});
*/

app.listen(11000);
