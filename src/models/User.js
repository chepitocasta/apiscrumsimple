const { Schema, model } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  role: String,
  userAvatar: {
    type: String,
    default:
      "https://cdn0.iconfinder.com/data/icons/hexagon-business-flat-part-2/218/Working_women-512.png"
  }
});

userSchema.set("timestamps", true);
userSchema.methods.encriptarClave = async password => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

userSchema.methods.validarClave = function(password) {
  return bcrypt.compare(password, this.password);
};
module.exports = model("User", userSchema);
