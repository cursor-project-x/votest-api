require('dotenv').config();

const express = require('express');
const environment = require('./config/environment');

const app = express();
const port = process.env.HTTP_PORT || 3000;

module.exports.environment = environment.setup(app).then(() => {
  return app.listen(port, () => {
    console.log(`Http server listening on http://0.0.0.0:${port}`);                                   // eslint-disable-line no-console
    console.log(`Votest App server started in ${process.env.NODE_ENV || 'development'} environment`); // eslint-disable-line no-console
  });
}).catch((e) => {
  console.error(e);
  process.exit(e);
});

module.exports.app = app;
