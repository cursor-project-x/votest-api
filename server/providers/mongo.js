const async = require('async');
const mongo = require('mongodb').MongoClient;

exports.connect = async.memoize((done) => {
  console.log('MongoDB: Connecting...'); // eslint-disable-line no-console
  return mongo.connect(process.env.MONGO_URL, (err, database) => {
    if (err) return done(err);
    console.log('MongoDB: Connected!'); // eslint-disable-line no-console
    return done(null, database);
  });
}, () => 'mongo');

// exports.toMongo = (item) => {
//   if (!item.id) return item; // eslint-disable-line no-underscore-dangle
//   return _.omit(Object.assign({}, item, { _id: item.id }), 'id');
// };

// exports.fromMongo = (item) => {
//   return _.omit(Object.assign({}, item, { id: item._id }), '_id'); // eslint-disable-line no-underscore-dangle
// };

// const ensure = (callback) => {
//   return function (...args) { // eslint-disable-line func-names
//     const done = args[args.length - 1] || (() => {});
//     return exports.connect((err, database) => {
//       if (err) {
//         if (done) return done(err);
//         throw new Error(err);
//       }

//       args[0] = database.collection(args[0]);
//       args[args.length - 1] = (err, result) => {
//         if (err) return done(err);

//         if (Array.isArray(result)) {
//           return done(null, result.map(exports.fromMongo));
//         }
//         return done(null, result);
//       };
//       return callback(...args);
//     });
//   };
// };

// exports.save = ensure((collection, item, done) => {
//   return collection.save(exports.toMongo(item), done);
// });

// exports.findById = ensure((collection, id, done) => {
//   return collection.find({ _id: id }).limit(1).toArray(done);
// });

// exports.findAllById = ensure((collection, ids, done) => {
//   return collection.find({ _id: { $in: ids } }).toArray(done);
// });

// exports.find = ensure((collection, params, done) => {
//   return collection.find(params).toArray(done);
// });

// exports.remove = ensure((collection, id, done) => {
//   return collection.remove({ _id: id }, { justOne: true }, done);
// });

