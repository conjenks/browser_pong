import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { GameManager } from './src/services/gameManager.js';
import cors from 'cors';

const app = express();
app.use(cors());

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "https://your-domain.com"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

const gameManager = new GameManager();

io.on('connection', (socket) => {
  console.log('Player connected:', socket.id);
  
  socket.on('joinGame', () => {
    const game = gameManager.joinGame(socket.id);
    socket.join(game.id);
    
    if (game.isReady()) {
      io.to(game.id).emit('gameStart', game.getState());
      game.start((state) => {
        io.to(game.id).emit('gameState', state);
      });
    } else {
      socket.emit('waiting');
    }
  });

  socket.on('paddleMove', (y) => {
    const game = gameManager.getGameByPlayerId(socket.id);
    if (game) {
      game.updatePaddlePosition(socket.id, y);
      io.to(game.id).emit('gameState', game.getState());
    }
  });

  socket.on('disconnect', () => {
    gameManager.handleDisconnect(socket.id);
    console.log('Player disconnected:', socket.id);
  });
});

const PORT = process.env.PORT || 3001;
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});