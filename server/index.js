// server/index.js
const express = require('express');
const { WebSocketServer } = require('ws');
const { setupWSConnection } = require('y-websocket/bin/utils');

const app = express();
const port = 3001;

// HTTP server for Socket.io
const httpServer = app.listen(port, () => {
  console.log(`Collaboration server running on port ${port}`);
});

// Y.js WebSocket server
const wss = new WebSocketServer({ server: httpServer });
wss.on('connection', (ws, request) => {
  setupWSConnection(ws, request);
});

// Socket.io for presence
const io = require('socket.io')(httpServer, {
  cors: { origin: '*' }
});

const rooms = new Map();

io.on('connection', (socket) => {
  socket.on('join-room', (roomId, userId) => {
    socket.join(roomId);
    if (!rooms.has(roomId)) {
      rooms.set(roomId, new Set());
    }
    rooms.get(roomId).add(userId);
    
    socket.to(roomId).emit('user-connected', userId);
    io.to(roomId).emit('room-users', Array.from(rooms.get(roomId)));
  });

  socket.on('disconnect', () => {
    rooms.forEach((users, roomId) => {
      if (users.delete(socket.id)) {
        io.to(roomId).emit('user-disconnected', socket.id);
        io.to(roomId).emit('room-users', Array.from(users));
      }
    });
  });
});