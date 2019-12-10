import mongoose from "mongoose";

export class MongoDbConnector {

    /**
     * Connect to Mongodb server and return a Promise.
     * 
     * @param host Mongodb host name
     * @param port Mongodb port
     * @param database Mongodb database
     * @param options Additional server options
     */
    public connect(host?: string, port?: any, database?: string, options?: object): Promise<typeof mongoose> {

        host = host || process.env.DB_HOST;
        port = port || process.env.DB_PORT;
        database = database || process.env.DB_DATABASE;

        let url = this.getUrl(host, port, database);

        options = Object.assign(options ? options : {}, {
            useUnifiedTopology: true, useNewUrlParser: true
        });

        return mongoose.connect(url, options);
    }

    /**
     * Returns a Mongodb server url from host, port
     * and database name.
     * 
     * @param host 
     * @param port 
     * @param database 
     */
    private getUrl(host: any, port: any, database: any): string {
        host = host.replace('/', '');
        database = database.replace('/', '');

        return `mongodb://${host}:${port}/${database}`;
    }
}
