const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const glob = require('glob');
const path = require('path');
require('dotenv').config();


const port = process.env.PORT || 3000;
const url = process.env.URL_DOMAIN || 'http://localhost'

const options = {
    swaggerDefinition: {
        openapi: "3.0.0",
            info: {
            title: "api 52",
            version: "1.0.0",
            description: "Documentación de la API del tic 52",
            },
        servers: [
            {
                url: `${url}:${port}`, 
                description: "Servidor Local",
            },
        ],
        security: [
            {
                // Define el tipo de autenticación y el nombre del esquema de seguridad
                BasicAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js'], 
};

// Encuentra dinámicamente todas las rutas en la carpeta 'routes'
const routeFiles = glob.sync(path.join(__dirname, './routes/*.js'));

// Agrega las rutas encontradas al array 'apis' en 'options'
options.apis.push(...routeFiles);

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };