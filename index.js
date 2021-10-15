const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const competitionController = require('./controllers/competitionController');

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT;

app.post('/competition', competitionController.create);
app.put('/competition', competitionController.update);

app.listen(port, () => console.log(`Conectado na porta ${port}`));

