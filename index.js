require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./config/sequelizeConfig');
const bodyParser = require('body-parser');
const { swaggerUi, specs } = require('./config/swagger');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;
const url = process.env.URL_DOMAIN || 'http://localhost'

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

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

