import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth.js";
import challengesRouter from "./routes/challengesRoute.js";
import usersRouter from "./routes/usersRoute.js";
import itemsRouter from "./routes/itemsRoute.js";

const app = express();
const PORT = process.env.PORT || 4000;

app.set("trust proxy", 1);

const authHandler = toNodeHandler(auth) as any;

app.use("/api/auth/**", (req: Request, res: Response, next: NextFunction) => {
  const originalSetHeader = res.setHeader.bind(res) as any;
  res.setHeader = ((name: string, value: any) => {
    if (name.toLowerCase() === "set-cookie") {
      const cookieArr = Array.isArray(value) ? value.map(String) : [String(value)];
      const modified = cookieArr.map((cookie) => {
        if (!cookie.toLowerCase().includes("samesite=none")) {
          if (/SameSite=/i.test(cookie)) {
            return cookie.replace(/SameSite=[^;]+/i, "SameSite=None");
          }
          return cookie + "; SameSite=None";
        }
        return cookie;
      });
      return originalSetHeader(name, modified);
    }
    return originalSetHeader(name, value);
  }) as any;
  return authHandler(req, res, next);
});

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
