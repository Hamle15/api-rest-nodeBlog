const mongoose = require("mongoose"); // entrar a node_modules y obtiene la dependencia

const conection = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect("mongodb://127.0.0.1:27017/mi_blog");

    //Parametros dentro de un objeto
    //useNewUrlParse: true
    //useUnifidyToplogy: true
    //useCreateIndex: true
    console.log("Successfully connected to the data base mi_blog");
  } catch (error) {
    console.log(error);
    throw new Error("Could not connect to the data base");
  }
};

module.exports = {
  conection,
};
