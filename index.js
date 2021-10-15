const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const competitionController = require('./controllers/competitionController');
const rankController = require('./controllers/rankController');

const app = express();

app.use(bodyParser.json());

const port = process.env.PORT;

app.post('/competition', competitionController.create);
app.put('/competition', competitionController.update);

app.post('/rank', rankController.create);
app.get('/rank', rankController.getRank);

app.listen(port, () => console.log(`Conectado na porta ${port}`));

