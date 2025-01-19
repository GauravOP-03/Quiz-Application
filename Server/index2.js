const express = require("express");
const app = express();
const { createServer } = require("node:http");
const { Server } = require("socket.io");
const cors = require("cors");

const port = 3000;

app.use(cors());
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// Store connected player details per room
let rooms = {}; // { roomId: [players] }

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Handle host details
  socket.on("host_details", (data) => {
    console.log("Host details received:", data);
    const id = socket.id;
    const newHost = { ...data.hostInput, id, role: "Host" };

    // Add the host to the room's player list
    const roomId = data.hostInput.roomId;
    if (!rooms[roomId]) {
      rooms[roomId] = [];
      rooms[roomId].push(newHost);

      // Add the host to the specified room
      socket.join(roomId);
      console.log(rooms);
    } else {
      socket.emit("room_error", "room is already created");
    }

    // Broadcast the updated list to everyone in the room
    io.to(roomId).emit("connected_players", rooms[roomId]);
  });

  // Handle player details
  socket.on("player_details", (data) => {
    console.log("Player details received:", data);
    const id = socket.id;
    const newPlayer = { ...data.playerInput, id, role: "Player" };

    // Add the player to the room's player list
    const roomId = data.playerInput.roomId;
    if (rooms[roomId]) {
      rooms[roomId].push(newPlayer);

      // Add the player to the specified room
      socket.join(roomId);

      // Broadcast the updated list to everyone in the room
      io.to(roomId).emit("connected_players", rooms[roomId]);
    } else {
      socket.emit("room_error", "Room does not exist");
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);

    // Remove the disconnected player from the relevant room
    for (const roomId in rooms) {
      rooms[roomId] = rooms[roomId].filter((player) => player.id !== socket.id);

      // Notify all clients in this room of the updated list
      io.to(roomId).emit("connected_players", rooms[roomId]);
      console.log(rooms);
    }
  });
});

server.listen(port, () => {
  console.log("Server is live on port", port);
});
