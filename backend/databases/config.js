// crear una conexion a la base de datos (cluster)
// retonmar la referencia de la conexion
const mongoose = require("mongoose");

// dbConnection -> async
const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });
    console.log("Conectado a la DB ");
  } catch (e) {
    console.error(e);
  }
};

module.exports = { dbConnection };
