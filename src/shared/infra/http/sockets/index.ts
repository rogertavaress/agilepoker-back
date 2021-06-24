/* eslint-disable @typescript-eslint/no-empty-function */
import { Server, Socket } from 'socket.io';

const sockets = (http: any): void => {
  const io = new Server(http);

  io.on('connection', (socket: Socket) => {
    console.log(`> Usuário conectado: ${socket.id}`);

    socket.on('join-meet-request', (data: any) => {
      console.log(`join-meet-request: ${data.id}`);
      socket.join(data.id);
      socket.to(data.id).emit('join-meet', data);
    });

    socket.on('sync-request', (data: any) => {
      console.log(`sync-request: ${data.id}`);
      socket.to(data.id).emit('sync', data);
    });
  });
};

export default sockets;
