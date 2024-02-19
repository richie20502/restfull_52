require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());


const port = process.env.PORT || 3000;
const url = process.env.URL_DOMAIN || 'http://localhost'

app.use('/api',require('./routes/index'));

app.listen(port,() => {
    console.log(`esta en en ${url}:${port}`);
});

