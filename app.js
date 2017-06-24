const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config({ path: '.env' });

mongoose.connect(process.env.DATABASE);
mongoose.Promise = global.Promise; // Tell Mongoose to use ES6 promises
mongoose.connection.on('error', (err) => {
  console.error(`🙅 🚫 🙅 🚫 🙅 🚫 🙅 🚫 → ${err.message}`);
});

require('./models/Url');

const routes = require('./routes');

const app = express();
const port = process.env.PORT || 5001;

app.use('/', routes);

app.use((err, req, res, next) => {
  console.log('⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔⛔');
  console.log('err:', err);
  res.statusMessage = err.message; // eslint-disable-line
  res.json(err).status(400);
  next();
});

app.listen(port, () => {
  console.log(`🌳  🌳  🌳  Now listening on ${port} 🌳  🌳  🌳`);
});
