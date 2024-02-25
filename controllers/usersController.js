const User = require("../models/User");
const bcrypt = require("bcryptjs");
const validator = require("validator");


async function getUserById(req, res) {
  try {
    const userId = req.params.id;

    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("Error al obtener el usuario:", error);
    res.status(500).json({ error: "Error al procesar la solicitud" });
  }
}

// Controlador para crear un nuevo usuario
async function createUser(req, res) {
    console.log("------ inicio ------");
    console.log(req.body);
    console.log("------ fin ------");

  try {
    const {
      email,
      name,
      lastname,
      phone,
      image = "imagen.jpg",
      password,
    } = req.body;

    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ error: "El formato del correo electrónico no es válido" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      name,
      lastname,
      phone,
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
  getUserById,
  createUser,
};
