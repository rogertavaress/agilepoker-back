/* eslint-disable @typescript-eslint/no-empty-function */
import { Server, Socket } from 'socket.io';

const sockets = (http: any): void => {
  const io = new Server(http);

  io.on('connection', (socket: Socket) => {
    console.log(`> Usuário conectado: ${socket.id}`);
  });

  io.on('update-participants-request', (socket: Socket) => {
    socket.emit('update-participant', () => {});
  });

  io.on('update-votes-request', (socket: Socket) => {
    socket.emit('update-votes', () => {});
  });
};

export default sockets;
