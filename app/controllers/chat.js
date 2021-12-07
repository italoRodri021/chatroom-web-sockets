module.exports.iniciaChat = function (application, req, res) {
  var dadosForm = req.body;

  req.assert("apelido", "O nome é obrigatório").notEmpty();
  req.assert("apelido", "O nome deve conter entre 3 e 15 letras").len(3, 15);
  var errors = req.validationErrors();

  if (errors) {
    res.render("index", { validacao: errors });
    return;
  }

  application.get("io").emit("$eventMsgParaCliente", {
    apelido: dadosForm.apelido,
    mensagem: "Entrou na conversa...",
  });

  res.render("chat.ejs", { dadosForm: dadosForm });
};
