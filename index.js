require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());


const port = process.env.PORT || 3000;

app.use('/api',require('./routes/index'));

app.listen(port,() => {
    console.log(`esta en en http://localhost:${port}`);
});

