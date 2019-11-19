const UserMdl = require("../models/User");

const getUser = async (req, res) => {
  const user = await UserMdl.findById(req.userId, { password: 0 });
  if (!user) {
    return res.status(404).json({ message: "El usuario no existe" });
  }
  res.json(user);
};

module.exports = {
  getUser
};
