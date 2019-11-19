const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(db => console.log("Base de datos iniciada"))
  .catch(errordb => console.log("Error al conectar con base de datos"));
