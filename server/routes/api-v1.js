const debug = require('debug')('app-route-api-v1')
const router = require('express').Router();
const mongoose = require('mongoose');
const _ = require('lodash');

var Poll = require('../model/Poll').model;





// const mongo = require('mongodb').MongoClient;
// const mongo = require('../providers/mongo');

mongoose.connect(process.env.MONGO_URL, { useMongoClient: true });
mongoose.Promise = global.Promise;





// @url /ping
router.get('/ping', (req, res) => {
  return res.json({
    message: 'pong',
    date: + new Date(),
  })
});

// create poll
// @url POST /poll
router.get('/poll', (req, res) => {
  var poll = {
    title: "На скільки вам ок заняття?",
    type: "pie-chart",
    answers: [
      "Дуже ок",
      "Ну, норм",
      "Взагалі не ок",
      "Інсульт!",
    ],
    votes: []
  };

  poll.pin = "11-11-11";

  var record = new Poll(poll);

  record.save(function (err) {
    console.log('err', err);
    console.log('record', record);
  });

  return res.json('create poll');
});

// get all polls
// @url GET /poll/:id
router.get('/polls', (req, res) => {
  Poll.find({}, (err, polls) => {
    return res.json({ polls });
  });
});

// get poll information
// @url GET /poll/:pin
router.get('/poll/:pin', (req, res) => {
  const pin = req.params.pin;

  Poll.findOne({ pin }, (err, poll) => {
    const pollFormatted = _.pick(poll, 'title', 'type', 'pin');
    pollFormatted.votesGrouped = Poll.groupVotes(poll);

    return res.json({ poll: pollFormatted });
  });
});

// vote on poll
// @url PUT /poll/:pin/vote
router.get('/poll/:pin/vote', (req, res) => {
  const pin = req.params.pin;

  Poll.findOne({ pin }, (err, poll) => {
    if (err) {
      console.log('err', err);
      return res.json({});
    }

    const answer = _.shuffle(poll.answers)[0];

    poll.votes.push(answer);

    poll.save((err) => {
      wss.broadcast(JSON.stringify({
        pin: pin,
        votesGrouped: Poll.groupVotes(poll),
      }));

      return res.json(answer);
    });


    // return res.json({ polls });
  });

});

module.exports = router;











const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8083 });

// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
  });

  // ws.send(JSON.stringify({test: 1}));
});

// setInterval(function () {
//   console.log(111);
//   wss.broadcast(JSON.stringify({test: 1}));
// }, 3000);
