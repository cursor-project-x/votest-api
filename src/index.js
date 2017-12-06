import express from "express";
import middlewaresConfig from "./config/middlewares";
import pollRoutes from "./routes/pollRoutes.js";
import http from 'http';
import io from "./config/socket.js";
import SocketIO from "socket.io";

const app = express();
const server = http.Server(app);
const socket = new SocketIO(server);

io(socket);

middlewaresConfig(app);

const PORT = process.env.PORT || 8000;

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  next();
});

app.use("/api", pollRoutes);

server.listen(PORT, err => {
  if (err) {
    throw err;
  } else {
    console.log(
      `Server running on port: ${PORT} || Welcome to ${
        process.env.NODE_ENV
      } mode`
    );
  }
});
