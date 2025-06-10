const express = require('express');
const { Router } = require('express');

const app = express();
const router = Router();

const port = 3000;

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const options = {
    swaggerOptions: {
        validatorUrl: null,
    },
};

router.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, options)
);

app.use('/', router);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
