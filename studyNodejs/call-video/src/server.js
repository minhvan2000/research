//Requiring dependencies
const express = require('express');

require('./db');

// Creating express app
const app = express();
// Requiring the config

app.listen(3000, () => {
    console.log(`app listening at http://localhost:${3000}`);
});
