require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./config/sequelizeConfig');
const bodyParser = require('body-parser');
const { swaggerUi, specs } = require('./config/swagger');
const morgan = require('morgan');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));

const port = process.env.PORT || 3000;
const url = process.env.URL_DOMAIN || 'http://localhost'

app.use('/api-docs', swaggerUi.serve, (req, res, next) => {
    // Middleware para interceptar solicitudes a la documentación de Swagger
    if (req.query.login) {
        // Si se proporcionan parámetros de inicio de sesión en la URL, procesar la autenticación
        const username = req.query.username;
        const password = req.query.password;
        
        // Implementa aquí la lógica de autenticación
        // Verifica si el usuario y la contraseña son válidos

        if (username === 'admin' && password === 'admin') {
            // Si las credenciales son válidas, redirigir al usuario a la página de documentación de Swagger
            res.redirect('/api-docs');
        } else {
            // Si las credenciales son inválidas, redirigir al usuario de nuevo al formulario de inicio de sesión
            res.sendFile(path.join(__dirname, 'login.html'));
        }
    } else {
        // Si no se proporcionan parámetros de inicio de sesión, continuar con la solicitud normalmente
        next();
    }
}, swaggerUi.setup(specs));

app.use('/api',require('./routes/index'));

app.get('/test', (req, res) => {
    res.json({ message: '¡Esta es una ruta de prueba!' });
});

sequelize.sync({ force: false })
    .then(() => {
        console.log('Base de datos y tablas creadas.');
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos:', error);
    });


app.listen(port,() => {
    console.log(`esta en en ${url}:${port}`);
});

