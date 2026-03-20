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

app.set("trust proxy", 1);

app.use((req, _res, next) => {
  console.log(`[ALL_REQUESTS] ${req.method} ${req.url} | Cookies: ${req.headers.cookie || "NONE"}`);
  next();
});

app.use("/api/auth", (req, _res, next) => {
  console.log(`[AUTH_ROUTE] ${req.method} ${req.url} | Cookies: ${req.headers.cookie || "NONE"}`);
  next();
});

const allowedOrigins = [
  "http://localhost:3000",
  "https://versus-blond.vercel.app",
  "https://versus-liard.vercel.app",
  "https://versus-2k2x6v2tg-oxilonxs-projects.vercel.app",
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

console.log("Setting up auth handler...");
app.all("/api/auth/*", toNodeHandler(auth));

app.use(express.json());

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
