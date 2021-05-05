const { Router } = require("express");

const { create, auth, validateAuth } = require("../controllers/auth");

const router = Router();

// [POST] /api/auth {email,name ,lastname ,password}
router.post("/", create);
router.post("/login", auth);
// http://localhost:3000/authorization
router.get("/authorization/:verificationCode", validateAuth);
//router.get("/verificationCode/:verificationCode');

module.exports = router;
