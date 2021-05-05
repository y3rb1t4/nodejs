const express = require("express");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
//dotenv
const dotenv = require("dotenv");
dotenv.config();
//conecction base de datos
const { dbConnection } = require("./databases/config");
const { securedUser, securedAdmin } = require("./middlewares/auth");
dbConnection();

// definicion de rutas
const products = require("./routes/products");
const auth = require("./routes/auth");
const purchase = require("./routes/purchase");
const contact = require("./routes/contact");

const adminProducts = require("./routes/admin/products");
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// use de routes
app.use("/contact", contact); // funciones lambda (AWS , FIREBASEXW)
app.use("/api/products", products);
app.use("/api/auth", auth);
app.use("/api/purchase", securedUser, purchase);

app.use("/api/admin/products", securedAdmin, adminProducts);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  res.sendStatus(404);
});

// error handler
app.use(function (err, req, res, next) {
  console.error(err);
  res.sendStatus(500);
});

module.exports = app;
