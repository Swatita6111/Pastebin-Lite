import "dotenv/config";
import express from "express";
import cors from "cors";

import health from "./routes/health.js";
import pastes from "./routes/pastes.js";
import pasteView from "./routes/pasteView.js";

const app = express();
const PORT = process.env.PORT || 3001;

// ✅ CORS middleware
app.use(cors({
  origin: [ "http://localhost:5173", "https://pastebin-lite-swart.vercel.app"],   // frontend URL
  methods: ["GET", "POST", "OPTIONS"], // include OPTIONS
  allowedHeaders: ["Content-Type"],    // allow JSON
  credentials: true                    // optional
}));

app.use(express.json()); // parse JSON body

// Mount routes
app.use("/api/healthz", health);
app.use("/api/pastes", pastes);
app.use("/p", pasteView);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
