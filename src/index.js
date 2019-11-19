const app = require("./app");

//iniciar servidor
app.listen(app.get("port"), () => {
  console.log("Servidor iniciado en puerto: ", app.get("port"));
});
