/* eslint-disable import/no-dynamic-require, global-require */
const debug = require('debug')('app-config')
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser');
const Promise = require('bluebird');

const mongo = require('../providers/mongo');

// check if environment is not production
const isProduction = () => process.env.NODE_ENV !== 'development';

// configure the express app
const setup = (app) => {
  // not required any more. Improves first call speed though
  if (process.env.NODE_ENV !== 'test') mongo.connect(() => {});

  const missingEnv = ['NODE_ENV', 'MONGO_URL'].filter(name => !process.env[name]);

  if (process.env.NODE_ENV !== 'test' && missingEnv && missingEnv.length) {
    const message = `The following environment variables are missing: ${missingEnv.join(', ').toUpperCase()}`;
    console.error(message);
    throw new Error(message);
  }

  app.set('json spaces', 2); // Format json output by default

  // Setup environment here
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.options('*', cors());
  app.use(cors());

  // configure routes
  require('../routes/').setup(app);

  mongo.connect(process.env.MONGO_URL, (err, database) => {
    if (err) {
      debug('error connecting to database', err);
      return done(err);
    }
    debug('MongoDB: Connected!');
  });

  // Error Handler
  app.use((err, req, res, next) => {
    if (err && err.isJoi) {
      // This is Joi error. Respond in jsonapi format
      return res.status('400')
        .json({ errors: [{
          status: '400',
          code: err.details[0].type,
          title: err.details[0].message,
          source: { pointer: `/data/attributes/${err.details[0].path}` },
        }] });
    }

    return res.status(500).send('Something went wrong.');
  });

  return Promise.resolve(app);
};

module.exports.setup = setup;
module.exports.isProduction = isProduction;
