import { auth } from "../lib/auth.js";
import type { ExpressContext } from "better-auth/express";
import type { Request, Response } from "express";

export function createAuthRouter() {
  const router = auth.router;

  return router;
}

export async function getSession(req: Request, res: Response) {
  return auth.api.getSession({
    headers: req.headers,
  });
}
