const express = require('express');
const router = express.Router();
const userController = require('../controllers/usersController');

/**
 * @swagger
 * tags:
 *   name: Usuarios
 *   description: Operaciones relacionadas con usuarios
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags: [Usuarios]
 *     summary: Obtiene un usuario por su ID.
 *     description: Obtiene un usuario específico de la base de datos según su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del usuario a obtener.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Usuario obtenido exitosamente.
 *       '404':
 *         description: Usuario no encontrado.
 *       '500':
 *         description: Error al procesar la solicitud.
 */
router.get('/:id', userController.getUserById);

/**
 * @swagger
 * /api/users:
 *   post:
 *     tags: [Usuarios]
 *     summary: Crea un nuevo usuario.
 *     description: Crea un nuevo usuario en la base de datos.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *               apellidoPaterno:
 *                 type: string
 *               apellidoMaterno:
 *                 type: string
 *               image:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - name
 *               - apellidoPaterno
 *               - apellidoMaterno
 *               - password
 *     responses:
 *       '200':
 *         description: Usuario creado exitosamente.
 *       '500':
 *         description: Error al procesar la solicitud.
 */
router.post('/', userController.createUser);

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     tags: [Usuarios]
 *     summary: Inicia sesión de un usuario.
 *     description: Inicia sesión de un usuario en el sistema.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *             required:
 *               - email
 *               - password
 *     responses:
 *       '200':
 *         description: Inicio de sesión exitoso.
 *       '401':
 *         description: Credenciales inválidas.
 *       '404':
 *         description: Usuario no encontrado.
 *       '500':
 *         description: Error al procesar la solicitud.
 */
router.post('/login', userController.login);

module.exports = router;
