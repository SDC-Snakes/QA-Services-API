const express = require('express');
const routes = require('./routes');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(routes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});