import express, { Application } from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { createServer, Server as HTTPServer } from 'http';
import path from 'path';

export class Server {
    private httpServer: HTTPServer;
    private app: Application;
    private io: SocketIOServer;
    private activeSockets: string[] = [];
    private readonly DEFAULT_PORT = 5000;

    constructor() {
        this.initialize();

        this.handleRoutes();
        this.handleSocketConnection();
    }

    private initialize(): void {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.io = new SocketIOServer(this.httpServer);

        this.configureApp();
        this.handleSocketConnection();
    }

    private configureApp(): void {
        this.app.use(express.static(path.join(__dirname, '../public')));
    }

    private handleRoutes(): void {
        this.app.get('/', (req, res) => {
            res.send(`<h1>Hello World</h1>`);
        });
    }

    private handleSocketConnection(): void {
        this.io.on('connection', (socket) => {
            console.log('Socket connected.');
            const existingSocket = this.activeSockets.find(
                (existingSocket) => existingSocket === socket.id
            );

            if (!existingSocket) {
                this.activeSockets.push(socket.id);

                socket.emit('update-user-list', {
                    users: this.activeSockets.filter(
                        (existingSocket) => existingSocket !== socket.id
                    ),
                });

                socket.broadcast.emit('update-user-list', {
                    users: [socket.id],
                });
            }

            socket.on('disconnect', () => {
                this.activeSockets = this.activeSockets.filter(
                    (existingSocket) => existingSocket !== socket.id
                );
                socket.broadcast.emit('remove-user', {
                    socketId: socket.id,
                });
            });
        });
    }

    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.DEFAULT_PORT, () =>
            callback(this.DEFAULT_PORT)
        );
    }
}
