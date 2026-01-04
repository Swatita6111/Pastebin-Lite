import Redis from "ioredis";

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL is not defined in .env");
}

export const redis = new Redis(process.env.REDIS_URL, {
  tls: {} // 🔐 REQUIRED for Upstash
});

redis.on("connect", () => {
  console.log("✅ Redis connected successfully");
});

redis.on("error", (err) => {
  console.error("❌ Redis connection error:", err);
});
