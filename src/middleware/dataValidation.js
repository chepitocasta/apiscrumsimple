const yup = require("yup");

const createUserValidation = (data, res, next) => {
  try {
    const schema = yup.object().shape({
      username: yup
        .string("El nombre de usuario debe ser de tipo string.")
        .required("El nombre de usuario es obligatorio.")
        .min(4, "El nombre de usuario debe ser tener minimo 4 caracteres."),
      email: yup
        .string("El correo debe ser de tipo string.")
        .required("El correo es obligatorio.")
        .email("El correo debe ser valido."),
      password: yup
        .string("La contraseña debe ser de tipo string.")
        .required("La contraseña es obligatorio.")
        .min(6, "La contraseña debe ser tener minimo 6 caracteres.")
    });
    schema.validateSync(data.body);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createUserValidation
};
