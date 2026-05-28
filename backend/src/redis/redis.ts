import { createClient } from "redis";

const redis = createClient({
    url: process.env.REDIS_URL
})

redis.on("error", (err) => {
    console.error("Redis Client Error", err);
});

export async function connectRedis() {
    await redis.connect();
}

export default redis;