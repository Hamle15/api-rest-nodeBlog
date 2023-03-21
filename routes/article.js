const express = require("express");
const multer = require("multer");
const ArticleControlle = require("../controllers/article");

const router = express.Router();

const storageImg = multer.diskStorage({
  //configure where the image they are goin to get stored
  destination: function (req, file, cb) {
    cb(null, "./images/articles/"); //subirar las imagenes a esa carpeta
  },
  filename: function (req, file, cb) {
    cb(null, "article" + Date.now() + file.originalname);
  },
});

const uploads = multer({ storage: storageImg });

//Rutas de Pruebas
router.get("/test-route", ArticleControlle.prueba);
router.get("/course", ArticleControlle.course);

//Ruta util
router.post("/create", ArticleControlle.create);
router.get("/articles/:last?", ArticleControlle.toList);
router.get("/article/:id", ArticleControlle.findOne);
router.delete("/article/:id", ArticleControlle.deleteArticle);
router.put("/article/:id", ArticleControlle.update);
router.post(
  "/upload-image/:id",
  [uploads.single("file0")],
  ArticleControlle.upload
);

module.exports = router;
