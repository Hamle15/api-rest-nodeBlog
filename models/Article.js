const { Schema, model } = require("mongoose"); //molde para crear los json conetado a la bd

const ArticleSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  image: {
    type: String,
    default: "default.png",
  },
});

module.exports = model("Article", ArticleSchema); //Se le puede pasar un tercer parametro para ver a que coleccion va
