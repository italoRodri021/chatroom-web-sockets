// -> Importar modulo do servidor express
var express = require("express");

// -> Importar o modulo do consign
var consing = require("consign");

// -> Importar body-parser
var bodyPaser = require("body-parser");

// -> Importar modulo do express-validator
var expressValidator = require("express-validator");

// -> Iniciar objt express
var app = express();

// -> Setar as variaveis 'view engine' e views do express
app.set("view engine", "ejs");
app.set("views", "./app/views");

// -> Configurar o middleware static.express
app.use(express.static("./app/public"));

// -> Configurar o middleware body-parser
app.use(bodyPaser.urlencoded({ extended: true }));

// -> Configurar o middleware express-validator
app.use(expressValidator());

// -> Efetua o autoload das rotas, dos models e dos controllers parara o objt app
consing()
  .include("app/routes")
  .then("app/models")
  .then("app/controllers")
  .into(app);

// -> Exportar o objeto app
module.exports = app;
