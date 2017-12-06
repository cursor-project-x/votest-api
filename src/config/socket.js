import db from "../config/db.js";

const Connect = (io) => {
  io.on('connection', (socket) => {
    socket.room = '';

    socket.on('join', (msg) => {
      socket.room = msg.room;
      socket.join(socket.room);
    });

    socket.on('vote', () => {
      const base = db.ref(`polls/${socket.room}/answers`).once("value").then(function(snapshot) {
        let data = snapshot.val();
        io.in(socket.room).emit('update', data);
      });
    });
});
}

module.exports = Connect;