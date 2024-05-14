const redis = require('redis');
const { promisify } = require('util');

class RedisClient {
    constructor() {
        this.client = redis.createClient();

        this.client.on('error', (err) => {
            console.error('Redis client not connected to the server:', err);
        });

        this.client.on('connect', () => {
            console.log('Redis client connected to the server');
        });

        this.getAsync = promisify(this.client.get).bind(this.client);
        this.setexAsync = promisify(this.client.setex).bind(this.client);
        this.delAsync = promisify(this.client.del).bind(this.client);
    }

    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        return this.getAsync(key);
    }

    async set(key, value, duration) {
        return this.setexAsync(key, duration, value);
    }

    async del(key) {
        return this.delAsync(key);
    }
}

const redisClient = new RedisClient();
module.exports = redisClient;
