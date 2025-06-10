import express from 'express';
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';
import path from 'path';

export class Server {
    private httpServer: any;
    private app: any;
    private io: any;

    // private app: Application = express();
    // private httpServer: HTTPServer = createServer(this.app);
    // private io: SocketIOServer = new SocketIOServer(this.httpServer);
    private activeSockets: string[] = [];

    private readonly DEFAULT_PORT = 5000;

    constructor() {
        this.initialize();

        this.handleRoutes();
        this.handleSocketConnection();
    }

    private handleRoutes(): void {
        this.app.get('/', (req, res) => {
            res.send(`<h1>Hello World</h1>`);
        });
    }

    private initialize(): void {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.io = new SocketIOServer(this.httpServer, {
            cors: {
                origin: ['http://127.0.0.1:5000', 'http://localhost:5000'],
                credentials: true,
            },
        });

        this.configureApp();
        this.handleSocketConnection();
    }

    private handleSocketConnection(): void {
        this.io.on('connection', (socket) => {
            console.log(socket);
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

            socket.on('call-user', (data) => {
                socket.to(data.to).emit('call-made', {
                    offer: data.offer,
                    socket: socket.id,
                });
            });

            socket.on('reject-call', (data) => {
                socket.to(data.from).emit('call-rejected', {
                    socket: socket.id,
                });
            });

            socket.on('make-answer', (data) => {
                socket.to(data.to).emit('answer-made', {
                    socket: socket.id,
                    answer: data.answer,
                });
            });
        });
    }

    public listen(callback: (port: number) => void): void {
        this.httpServer.listen(this.DEFAULT_PORT, () =>
            callback(this.DEFAULT_PORT)
        );
    }

    private configureApp(): void {
        this.app.use(express.static(path.join(__dirname, '../public')));
    }
}
