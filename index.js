require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./config/sequelizeConfig');
//app.use(cors());
app.use(bodyParser.json());


const port = process.env.PORT || 3000;
const url = process.env.URL_DOMAIN || 'http://localhost'


app.use('/api',require('./routes/index'));

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

