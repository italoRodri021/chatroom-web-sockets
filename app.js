// -> Importar configuracoes do servidor
var app = require("./config/server.js");

// -> Paramentrizar porta de escuta
var server = app.listen(80, function () {
  console.log("SERVIDOR ONLINE");
});

// -> Definindo onde o socket.io vai escutar
var io = require("socket.io").listen(server);

app.set("io", io);

// -> Criar conexao por websocket
io.on("connection", function (socket) {
  console.log("Usuario conectou");

  socket.on("disconnect", function () {
    console.log("Usuario desconectou");
  });

  socket.on("$eventMsgParaServidor", function (data) {
    // Eventos de dialogo
    socket.emit("$eventMsgParaCliente", {
      apelido: data.apelido,
      mensagem: data.mensagem,
    });

    // -> emitindo dialogo para todos os participantes
    socket.broadcast.emit("$eventMsgParaCliente", {
      apelido: data.apelido,
      mensagem: data.mensagem,
    });

    if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
      // -> Atualizando participantes
      socket.emit("$eventParticipantesParaCliente", {
        apelido: data.apelido,
      });

      // -> Atualizando participantes para todos
      socket.broadcast.emit("$eventParticipantesParaCliente", {
        apelido: data.apelido,
      });
    }
    
  });
});
