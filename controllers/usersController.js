const User = require("../models/User");
const bcrypt = require('bcryptjs');

const index = (req, res) => {
    console.log('index usersController');
    res.send('respuiesta desde controlador');
};

async function createUser(req, res) {
    console.log("------ inicio ------");
    console.log(req.body);
    console.log("------ fin ------");

  try {
    const {email, name, apellidoPaterno, apellidoMaterno, image = "imagen.jpg",password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      name,
      apellidoPaterno,
      apellidoMaterno,
      image,
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: "El usuario se creó correctamente",
      data: newUser,
    });
  } catch (error) {
    console.error("Error al crear un nuevo usuario:", error);
    res.status(500).json({
      success: false,
      message: "Hubo un error al crear el usuario.",
      error: error.message,
    });
  }
}


module.exports = {
    index,
    createUser
}