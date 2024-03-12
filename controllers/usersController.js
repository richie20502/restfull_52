const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('../config/passport');
const User = require('../models/User');
const keys = require('../config/keys');



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
      apellidoPaterno,
      apellidoMaterno,
      image = "imagen.jpg",
      password,
    } = req.body;

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

async function login(req, res) {
  console.log("Llega al login");
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ 
                success : false,
                message: 'Usuario no encontrado'
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        const payload = {
            id: user.id,
            email: user.email
        };

        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (err, token) => {
            if (err) {
                throw err;
            }
            res.json({
                success: true,
                message: 'Inicio de sesión exitoso',
                data: {
                    token: 'Bearer ' + token,
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    lastname: user.lastname,
                    phone: user.phone,
                    image: user.image,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt
                }
            });
        });
    } catch (error) {
        console.error('Error en el inicio de sesión:', error);
        res.status(500).json({ error: 'Error al procesar la solicitud' });
    }
}

module.exports = {
  getUserById,
  createUser,
  login,
};
