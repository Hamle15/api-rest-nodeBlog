const validator = require("validator");
const Article = require("../models/Article");

const prueba = (req, res) => {
  return res.status(200).json({
    mensaje: "I am a test in my controller Article",
  });
};

const course = (req, res) => {
  return res.status(200).json([
    {
      curso: "Mater in React",
      author: "Hamlet Pirazan",
      url: "https://www.youtube.com/shorts/SWVoz0k8LEs",
    },
    {
      curso: "Mater in C#",
      author: "Hamlet Pirazan",
      url: "https://www.youtube.com",
    },
  ]);
};

const create = (req, res) => {
  //Recojer los parametros por post
  const parameters = req.body;

  //Validar datos
  try {
    let title_validation =
      !validator.isEmpty(parameters.title) &&
      validator.isLength(parameters.title, { min: 5, max: undefined }); //true que esta bien
    console.log(title_validation, "Si es true tiene informacion");
    let content_validation = !validator.isEmpty(parameters.content);

    if (!title_validation || !content_validation) {
      console.log();
      throw new Error("No se ha validado la informacion");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos",
    });
  }

  //Crear el objeto a guardar
  //Asignar valores a objeto basado en el modelo (manual o automatico)
  const article = new Article(parameters);

  article
    .save()
    .then((articleSaved) => {
      if (!articleSaved) {
        return res.status(400).json({
          status: "error",
          message: "Missing data to send",
        });
      }

      // return result
      return res.status(200).json({
        status: "success",
        article: articleSaved,
        message: "article saved successfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  prueba,
  course,
  create,
};
