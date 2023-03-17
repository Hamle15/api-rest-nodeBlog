const express = require("express");
const router = express.Router();

const ArticleControlle = require("../controllers/article");

//Rutas de Pruebas
router.get("/test-route", ArticleControlle.prueba);
router.get("/course", ArticleControlle.course);

//Ruta util
router.post("/create", ArticleControlle.create);
router.get("/articles/:last?", ArticleControlle.toList);
router.get("/article/:id", ArticleControlle.findOne);
router.delete("/article/:id", ArticleControlle.deleteArticle);
router.put("/article/:id", ArticleControlle.update);

module.exports = router;
