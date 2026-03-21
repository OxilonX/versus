import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import challengesRouter from "./routes/challengesRoute.js";
import usersRouter from "./routes/usersRoute.js";
import itemsRouter from "./routes/itemsRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;
const isDev = process.env.IS_DEV === "true";
app.set("trust proxy", 1);

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || [
  "http://localhost:3000",
];

app.use(
  cors({
    origin: isDev ? "http://localhost:3000" : allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Cookie"],
  }),
);
app.use(express.json());

app.use("/api/auth", toNodeHandler(auth));

app.use("/api/challenges", challengesRouter);
app.use("/api/users", usersRouter);
app.use("/api/items", itemsRouter);
app.get("/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📚 Auth API available at http://localhost:${PORT}/auth`);
});
