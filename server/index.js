const express = require('express');
const { createServer } = require('node:http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

const mensajes = [];

io.on("connection", (socket) => {
  console.log("Usuario conectado: " + socket.id);

  socket.emit("message", ["¡Bienvenido al chat!"]);

  socket.on("message", (msg) => {

    mensajes.push(msg);
    //io.emit => Envia a todos los clientes, incluido uno mismo
    // socket.broadcast.emit => Envia a todos los clientes, excepto uno mismo
    //socket.emit => Envia solo al cliente conectado

    socket.emit("Confirmation", "Mensaje enviado");
    socket.broadcast.emit("message", mensajes);
  });
});

app.get("/", (req, res) => {
  res.send("¡Hola, mundo!");
});

server.listen(3000, () => {
  console.log('Server corriendo en http://localhost:3000');
});