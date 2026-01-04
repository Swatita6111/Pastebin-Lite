import { Router } from "express";
import { redis } from "../redis.js";
import { v4 as uuid } from "uuid";
import { getNow } from "../time.js";

const router = Router();

/**
 * POST /api/pastes
 */
router.post("/", async (req, res) => {
  const { content, ttl_seconds, max_views } = req.body;

  if (!content || typeof content !== "string" || !content.trim()) {
    return res.status(400).json({ error: "Invalid content" });
  }

  if (ttl_seconds && ttl_seconds < 1) {
    return res.status(400).json({ error: "Invalid ttl_seconds" });
  }

  if (max_views && max_views < 1) {
    return res.status(400).json({ error: "Invalid max_views" });
  }

  const id = uuid();
  const now = Date.now();

  const paste = {
    content,
    maxViews: max_views ?? null,
    views: 0,
    expiresAt: ttl_seconds ? now + ttl_seconds * 1000 : null
  };

  await redis.set(`paste:${id}`, JSON.stringify(paste));

  res.json({
    id,
    url: `${req.protocol}://${req.get("host")}/p/${id}`
  });
});

/**
 * GET /api/pastes/:id
 */
router.get("/:id", async (req, res) => {
  const key = `paste:${req.params.id}`;
  const raw = await redis.get(key);

  if (!raw) {
    return res.status(404).json({ error: "Not found" });
  }

  const paste = JSON.parse(raw);
  const now = getNow(req).getTime();

  if (paste.expiresAt && now >= paste.expiresAt) {
    await redis.del(key);
    return res.status(404).json({ error: "Expired" });
  }

  if (paste.maxViews !== null && paste.views >= paste.maxViews) {
    return res.status(404).json({ error: "View limit exceeded" });
  }

  paste.views += 1;
  await redis.set(key, JSON.stringify(paste));

  res.json({
    content: paste.content,
    remaining_views:
      paste.maxViews === null ? null : paste.maxViews - paste.views,
    expires_at: paste.expiresAt
      ? new Date(paste.expiresAt).toISOString()
      : null
  });
});

export default router;
