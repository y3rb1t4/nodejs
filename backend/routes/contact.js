const router = require("express").Router();
const { contactEmail } = require("../controllers/contact");

/*
    CASO DE PRUEBA
    Desde postman: [POST] /contact {nombre;'nombre ,lastname,email,comment}
*/

router.post("/", contactEmail);

module.exports = router;
