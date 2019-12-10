import { MongoDbConnector } from "./db";

import app from './app';
import http from 'http';

class Server {
    /**
     * Connects to the mongoDb server and on successfull connection
     * listens to server port for client requests.
     */
    public startServer() {
        new MongoDbConnector().connect()
            .then(
                // On successfull connection, open a port
                // and listen to requests
                () => {
                    this.listenRequests();
                },
                // On error, log the error response and exit
                // the process.
                error => {
                    console.error("Error connecting to database. Server not started.");
                    console.error(error);
                }
            );
    }

    /**
     * Initiate server to listen to client requests. This
     * function listens to a port on the server.
     */
    private listenRequests(): void {

        const port = this.normalizePort(process.env.PORT || process.env.APP_PORT || '3000');
        app.set('port', port);

        const server = http.createServer(app);
        server.listen(port);
        server.on('listening', () => this.onListening(server));
        server.on('error', error => this.onError(error, port));
    }

    /**
     * Convert port inputs into an integer value
     * 
     * @param val Port value
     */
    private normalizePort(val: any) {
        var port = parseInt(val, 10);

        return isNaN(port) ? val : (port >= 0 ? port : false);
    }

    /**
     * Error callback to show pretty human readable
     * error message.
     * 
     * @param error 
     */
    private onError(error: any, port: any) {
        if (error.syscall !== 'listen') {
            throw error;
        }
        var bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(bind + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(bind + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }

    /**
     * Server connection success callback. Log the 
     * connection success messages.
     */
    private onListening(server: http.Server) {
        const addr = server.address();

        if (addr != null) {
            const bind = typeof addr == 'string' ?
                'pipe ' + addr :
                'port ' + addr.port;
            console.log('Listening on ' + bind);
        }
    }
}

new Server().startServer();