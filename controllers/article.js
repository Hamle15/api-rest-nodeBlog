const fs = require("fs");
const Article = require("../models/Article");
const { validate } = require("../helpers/validate");

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
    validate(parameters);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      menssage: "Faltan datos por enviar",
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
  console.log(parameters, "hellow");

  try {
    validate(parameters);
  } catch (error) {
    return res.status(400).json({
      status: "error",
      menssage: "Faltan datos por enviar",
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

const upload = (req, res) => {
  //Configure Multure

  //Take fichero of the img
  if (!req.file && !req.files) {
    return res.status(404).json({
      status: "error",
      mensaje: "Peticion not validad",
    });
  }

  //Name of the archive

  let archive = req.file.originalname;

  //Extension del archive
  let archive_split = archive.split(".");
  let extension = archive_split[1];

  //check correct extension
  if (
    extension != "png" &&
    extension != "jpg" &&
    extension != "jpeg" &&
    extension != "gif"
  ) {
    //Delete archive and give answer
    fs.unlink(req.file.path, (error) => {
      return res.status(400).json({
        status: "error",
        mensaje: "Format not validad",
      });
    });
  } else {
    //Its al ok, update the article

    //Return answer

    return res.status(200).json({
      status: "succes",
      extension,
      files: req.file,
    });
  }
};

module.exports = {
  prueba,
  course,
  create,
  toList,
  findOne,
  deleteArticle,
  update,
  upload,
};
