const { Router } = require("express");
const router = Router();
const authCrt = require("../controllers/authController");
const userCrt = require("../controllers/userController");
const verificarToken = require("../middleware/verificarTokenController");
const validations = require("../middleware/dataValidation");
const Email = require("../controllers/mailController");

router.post("/signup", validations.createUserValidation, authCrt.signUp);

router.post("/signin", authCrt.signIn);

router.get("/me", verificarToken, userCrt.getUser);

// router.post("/mail", Email);

router.get("/cuentaactiva/:codeUser", (req, res) => {
  console.log(req.params.codeUser);
  res.status(200).send(req.params.codeUser);
});

module.exports = router;
