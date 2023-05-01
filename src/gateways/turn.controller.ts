import { WebSocketGateway, WebSocketServer, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import * as io from 'socket.io';
import * as NodeTurn from 'node-turn';

@WebSocketGateway()
export class TurnServerGatewayController implements OnGatewayConnection, OnGatewayDisconnect {

    @WebSocketServer() server: Server;
    private turnServer: any;

    constructor() {
        const httpServer = createServer();
        const turnServerOptions = {
            authMech: 'none',
            debugLevel: 'ALL',
            listeningIps: ['0.0.0.0'],
            listeningPorts: [3478],
            relayIps: ['127.0.0.1'],
            relayPorts: {
                tcp: 5349,
                udp: 3478,
                tls: 5349
            },
        };
        this.turnServer = new NodeTurn(turnServerOptions);
        this.turnServer.start(() => {
            console.log('TURN server started');
        });
        const ioServer = new io.Server(httpServer, {
            cors: {
                origin: '*'
            }
        });
        ioServer.on('connection', (socket: Socket) => {
            this.turnServer.handleConnection(socket.conn);
            socket.on('disconnect', () => {
                this.turnServer.handleDisconnection(socket.conn);
            });
        });
        httpServer.listen(3000);
    }

    handleConnection(client: Socket) {
        console.log('Client connected');
    }

    handleDisconnect(client: Socket) {
        console.log('Client disconnected');
    }
}