const { Router } = require("express");
const router = Router();

const { all, create, find } = require("../controllers/products");

const { validateCreate } = require("./../middlewares/actions/product");

// router -> GET , POST , PUT (actualizacion completa ) , DELETE , PATCH (actualizacion parcial)
//localhost:8000/products/find/1 [GET]
router.get("/:id", find);
//localhost:8000/products [GET]
router.get("/", all);
//localhost:8000/products [POST]
router.post("/", create);

module.exports = router;
