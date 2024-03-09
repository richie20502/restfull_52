require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const sequelize = require('./config/sequelizeConfig');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:true }));


const port = process.env.PORT || 3000;
const url = process.env.URL_DOMAIN || 'http://localhost'

app.use('/api',require('./routes/index'));

sequelize.sync({force:false})
        .then(() => {
            console.log('conexiuon a base de datos exitosa');
        }).catch((error ) => {
            console.log('ERROR sincronizacion de base de datos: ', error);
    });

app.listen(port,() => {
    console.log(`esta en en ${url}:${port}`);
});

