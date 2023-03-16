const express = require("express");
const router = express.Router();

const ArticleControlle = require("../controllers/article");

//Rutas de Pruebas
router.get("/test-route", ArticleControlle.prueba);
router.get("/course", ArticleControlle.course);

//Ruta util
router.post("/create", ArticleControlle.create);

module.exports = router;
