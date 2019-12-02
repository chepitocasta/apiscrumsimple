const UserMdl = require("../models/User");
const jwt = require("jsonwebtoken");
const mailController = require("./mailController");

//REGISTRO DE USUARIOS
const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  const user = new UserMdl({
    username,
    email,
    password
  });
  user.password = await user.encriptarClave(user.password);
  user.activationCode = await user.activationCodeUser();

  const existUser = await UserMdl.findOne({ email });
  if (existUser) {
    return res.status(400).send({ message: "El correo ya esta registrado." });
  }

  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
    expiresIn: 60 * 60 * 24
  });

  // Envio de correo de activacion de usuario
  objMail = {
    // html de correo
    htmlMail:
      "<center><div style='width: 450px; height: 210px; border-style: solid; border-width: 1px; border-radius: 15px;'><div style='text-align: left; color: #fff; background-color: orange; font-size: 20px; padding: 5px; border-radius: 15px 15px 0px 0px;'><strong>SCRUM TOOL</strong></div><div><h5>Bienvenido a SCRUM TOOL</h5><p>&iexcl;Estamos contentos de que est&eacute;s aqu&iacute;!</p><p>Para activar tu cuenta solo tienes que dar clic en el siguiete enlace que te presentamos en este correo</p><a style='background-color: blue; color: #fff; text-decoration: none; padding: 5px; cursor: pointer;' href='http://localhost:4000/cuentaactiva/" +
      email +
      "/" +
      user.activationCode +
      "'> Activar Cuenta</a><p style='color: orange;'>En caso de que tu no hayas realizado la solicitud de esta herramienta en nuestra pagina, simplemento ignora este correo.</p></div></div></center>",
    email: email
  };
  mailController.sendEmail(objMail);

  res.json({ user, token });
};

//LOGIN DE USUARIOS
const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserMdl.findOne({ email });
  if (!user) {
    return res.status(400).send({ message: "Usuario o clave incorrecta" });
  }

  const validPassword = await user.validarClave(password);
  if (!validPassword) {
    return res.status(400).json({ message: "Usuario o clave incorrecta" });
  }

  const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
    expiresIn: 60 * 60 * 24
  });

  res.json({ token });
};

//ACTIVACION DE USUARIO
const activeUser = async (req, res) => {
  const { emailUser, codeUser } = req.params;

  const user = await UserMdl.findOne({
    email: emailUser,
    activationCode: codeUser
  });
  if (!user) {
    return res.status(400).send({ message: "Correo no registrado." });
  }
  if (user.activationCode !== codeUser) {
    return res.status(400).send({ message: "Codigo de activacion no valido." });
  }
  if (user.state !== false) {
    return res
      .status(400)
      .send({ message: "El usuario ya se encuentra activo" });
  }

  res.status(200).send(user);
};

module.exports = {
  signUp,
  signIn,
  activeUser
};
