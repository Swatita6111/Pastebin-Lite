import { Router } from "express";
import { redis } from "../redis.js";

const router = Router();

router.get("/:id", async (req, res) => {
  const raw = await redis.get(`paste:${req.params.id}`);
  if (!raw) {
    return res.status(404).send("Not Found");
  }

  const paste = JSON.parse(raw);

  res.send(`
    <!DOCTYPE html>
    <html>
      <body>
        <pre>${escapeHtml(paste.content)}</pre>
      </body>
    </html>
  `);
});

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, m =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m])
  );
}

export default router;
