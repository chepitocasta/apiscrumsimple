const UserMdl = require("../models/User");
const jwt = require("jsonwebtoken");

//REGISTRO DE USUARIOS
const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  const user = new UserMdl({
    username,
    email,
    password
  });
  user.password = await user.encriptarClave(user.password);

  const existUser = await UserMdl.findOne({ email });
  if (existUser) {
    return res.status(400).send({ message: "El correo ya esta registrado." });
  }

  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.SECRET_TOKEN, {
    expiresIn: 60 * 60 * 24
  });

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

module.exports = {
  signUp,
  signIn
};
