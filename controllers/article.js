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

    console.log(content_validation, "Si es true tiene informacion");

    console.log(!title_validation, "Mirando");
    console.log(!content_validation, "Mirando");

    if (!title_validation || !content_validation) {
      console.log("holaaa");
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
      // return result
      return res.status(200).json({
        status: "success",
        article: articleSaved,
        message: "article saved successfully",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        status: "error",
        message: "Missing data to send",
      });
    });
};

const toList = (req, res) => {
  let query = Article.find({});

  if (req.params.last) {
    query.limit(3);
  }

  query
    .sort({ date: -1 })
    .exec()
    .then((articles) => {
      return res.status(200).send({
        status: "succes",
        counter: articles.length,
        articles,
      });
    })
    .catch((error) => {
      console.log(error);
      return res.status(404).json({
        status: "error",
        mensaje: "Coldnt find articles",
      });
    });
};

const findOne = (req, res) => {
  //Recorger id por URL
  let id = req.params.id;

  Article.findById(id)
    .then((article) => {
      console.log(article);
      return res.status(200).json({
        status: "success",
        article,
      });
    })
    .catch((error) => {
      return res.status(404).json({
        status: "error",
        mensaje: "Coldnt find article",
      });
    });
};

const deleteArticle = (req, res) => {
  let id = req.params.id;

  Article.findOneAndDelete({ _id: id })
    .then((articleDelete) => {
      return res.status(200).json({
        status: "succes",
        articleDelete,
        mensaje: "Borrado",
      });
    })
    .catch(() => {
      return res.status(400).json({
        status: "succes",
        mensaje: "Method delete",
      });
    });
};

const update = (req, res) => {
  let id = req.params.id;
  console.log(id);
  let parameters = req.body;
  console.log(parameters);

  try {
    let title_validation =
      !validator.isEmpty(parameters.title) &&
      validator.isLength(parameters.title, { min: 5, max: undefined }); //true que esta bien

    console.log(title_validation, "Si es true tiene informacion");

    let content_validation = !validator.isEmpty(parameters.content);

    console.log(content_validation, "Si es true tiene informacion");

    console.log(!title_validation, "Mirando");
    console.log(!content_validation, "Mirando");

    if (!title_validation || !content_validation) {
      console.log("holaaa");
      throw new Error("No se ha validado la informacion");
    }
  } catch (error) {
    return res.status(400).json({
      status: "error",
      mensaje: "Faltan datos",
    });
  }

  Article.findOneAndUpdate({ _id: id }, parameters, { new: true })
    .then((articleUpdate) => {
      if (!articleUpdate) {
        return res.status(500).json({
          status: "error",
          mensaje: "Fail to update",
        });
      }

      return res.status(200).json({
        status: "succes",
        articleUpdate,
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
  toList,
  findOne,
  deleteArticle,
  update,
};
