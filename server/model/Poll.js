const mongoose = require('mongoose');
const _ = require('lodash');

var PollSchema = new mongoose.Schema({
  title: String,
  type: String,
  pin: String,
  answers: Array,
  votes: Array,
});

PollSchema.statics.groupVotes = function (poll, cb) {
  // group by key
  let votesGrouped = ((poll || {}).votes || []).reduce((total, current) => {
    if (typeof total[current] == "undefined") {
      total[current] = 0;
    }
    total[current]++;

    return total
  }, {});

  return votesGrouped;
}

var Poll = mongoose.model('Poll', PollSchema);

module.exports.model = Poll;
module.exports.schema = PollSchema;
