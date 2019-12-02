const { Router } = require("express");
const router = Router();
const authCrt = require("../controllers/authController");
const userCrt = require("../controllers/userController");
const verificarToken = require("../middleware/verificarTokenController");
const validations = require("../middleware/dataValidation");
const Email = require("../controllers/mailController");

router.post("/signup", validations.createUserValidation, authCrt.signUp);

router.post("/signin", authCrt.signIn);

// router.get("/cuentaactiva/:emailUser/:codeUser", (req, res) => {
//   res.status(200).send(req.params);
// });

router.get("/cuentaactiva/:emailUser/:codeUser", authCrt.activeUser);

router.get("/me", verificarToken, userCrt.getUser);

module.exports = router;
