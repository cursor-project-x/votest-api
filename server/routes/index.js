// configure the express app
module.exports.setup = (app) => {
  // test (service) page
  app.use('/api/v1', require('./api-v1'));

  // error handler
  // app.use(require('./404'));
};
