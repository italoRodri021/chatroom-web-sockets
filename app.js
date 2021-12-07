// -> Importar configuracoes do servidor
var app = require("./config/server.js");

// -> Paramentrizar porta de escuta
var server = app.listen(80, function () {
  console.log("SERVIDOR ONLINE");
});

// -> Definindo onde o socket.io vai escutar
require("socket.io").listen(server);
