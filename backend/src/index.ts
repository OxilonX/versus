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

function cookieInterceptor(res: Response) {
  const originalSetHeader = res.setHeader.bind(res) as any;
  const originalAppend = res.append.bind(res) as any;
  
  const modifyCookies = (value: any) => {
    const cookieArr = Array.isArray(value) ? value.map(String) : [String(value)];
    return cookieArr.map((cookie) => {
      if (!cookie.toLowerCase().includes("samesite=none")) {
        if (/SameSite=/i.test(cookie)) {
          return cookie.replace(/SameSite=[^;]+/i, "SameSite=None");
        }
        return cookie + "; SameSite=None";
      }
      return cookie;
    });
  };
  
  res.setHeader = ((name: string, value: any) => {
    if (typeof name === "string" && name.toLowerCase() === "set-cookie") {
      return originalSetHeader(name, modifyCookies(value));
    }
    return originalSetHeader(name, value);
  }) as any;
  
  res.append = ((name: string, value: any) => {
    if (typeof name === "string" && name.toLowerCase() === "set-cookie") {
      return originalAppend(name, modifyCookies(value));
    }
    return originalAppend(name, value);
  }) as any;
  
  return res;
}

app.use("/api/auth/**", (req: Request, res: Response, next: NextFunction) => {
  cookieInterceptor(res);
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
