import { createClient } from 'redis';

const client = createClient({
    username: process.env.REDIS_USERNAME,
    password: process.env.REDIS_PASSWORD, 
    socket: {
        host: process.env.REDIS_HOST,
        port: 10932
    }
});

client.on('error', err => console.log('Redis Client Error', err));

await client.connect();

client.on("error", err => console.error("Redis Error: ",err))

export default client

