import { Router } from "express";
import { redis } from "../redis.js";

const router = Router();

router.get("/", async (_, res) => {
  try {
    await redis.ping();
    res.json({ ok: true });
  } catch {
    res.status(500).json({ ok: false });
  }
});

export default router;
