const { MongoClient } = require('mongodb');

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';

        const uri = `mongodb://${host}:${port}/${database}`;

        this.client = new MongoClient(uri);
    }
    isAlive() {
        return this.isConnected;
    }

    async nbUsers() {
        if (!this.isConnected) return -1;

        const usersCollection = this.client.db().collection('users');
        return usersCollection.countDocuments();
    }

    async nbFiles() {
        if (!this.isConnected) return -1;

        const filesCollection = this.client.db().collection('files');
        return filesCollection.countDocuments();
    }
}

const dbClient = new DBClient();
module.exports = dbClient;
