const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: String,
  userAvatar: String,
  email: String,
  password: String,
  signupDate: { type: Date, default: Date.now() }
});

userSchema.methods.encriptarClave = async password => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.validarClave = function(password) {
  return bcrypt.compare(password, this.password);
};
module.exports = model("User", userSchema);
