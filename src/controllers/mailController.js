const nodemailer = require("nodemailer");

// funcion para enviar correo
let sendEmail = function(objMail){
  // Definimos el transporter
  console.log("inicio mail");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "josecasta.dev@gmail.com",
      pass: "Jose.Dev.Code"
    }
  });

  // Definimos el email
  var mailOptions = {
    from: "josecasta.dev@gmial.com",
    to: objMail.email,
    subject: "Activacion de cuenta Scrum tool",
    html: objMail.htmlMail
  };
  // Enviamos el email
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      return res.status(500).send({ message: err.message });
    } else {
      return res.status.send({ message: req.body });
    }
  });
};

module.exports = {
  sendEmail
};
