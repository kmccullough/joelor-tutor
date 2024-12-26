import express from 'express';
import { Server as HttpServer } from 'node:http';
import path from 'node:path';
import { Server as SocketServer } from 'socket.io';

const app = express();
const http = new HttpServer(app);
const io = new SocketServer(http);
const port = 3000;

http.listen(port, () => console.log(`Listening on port http://localhost:${port}`));

const indexPath = './public/index.html';
const publicPath = path.dirname(indexPath);

app.use(express.static(publicPath));
app.get('/', (req, res) => res.sendFile(indexPath));

io.on('connection', socket => {
  const { id } = socket;
  console.log(`User ${id}: Connected`);
  socket.on('disconnect', () => {
    console.log(`User ${id}: Disconnected`);
  });
  socket.on('inc', i => {
    console.log(`User ${id}: Inc: ${i}`);
    socket.broadcast.emit('inc', i);
  });
});
