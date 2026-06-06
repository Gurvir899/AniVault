import { createClient } from "redis";

const redis = createClient({
    url: process.env.REDIS_URL
})

redis.on("error", (err) => {
    console.error("Redis Client Error", err);
});

export async function connectRedis() {
    try {
        await redis.connect();
    } catch (err) {
        console.error("Failed to connect to cache", err);
    }
}

export default redis;