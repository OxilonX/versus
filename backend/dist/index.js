import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
//routes imports
import challengesRouter from "./routes/challengesRoute.js";
import usersRouter from "./routes/usersRoute.js";
import itemsRouter from "./routes/itemsRoute.js";
const app = express();
const PORT = process.env.PORT || 4000;
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
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
//# sourceMappingURL=index.js.map