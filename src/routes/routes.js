const { Router } = require("express");
const router = Router();
const authCrt = require("../controllers/authController");
const userCrt = require("../controllers/userController");
const verificarToken = require("../middleware/verificarTokenController");
const validations = require("../middleware/dataValidation");

router.post("/signup", validations.createUserValidation, authCrt.signUp);

router.post("/signin", authCrt.signIn);

router.get("/me", verificarToken, userCrt.getUser);

module.exports = router;
