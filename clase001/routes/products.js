const { Router } = require("express");
const router = Router();
const { all, create } = require("../controllers/products");
//products.js va manjear las rutas del proyecto [GET,POST,PUT,DELETE,PATCH]
// http://localhost:3000/products

router.get("/", all);

router.post("/", create);

module.exports = router;
