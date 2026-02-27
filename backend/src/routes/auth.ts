import { auth } from "../lib/auth.js";
import type { Request, Response } from "express";

export async function getSession(req: Request, res: Response) {
  return auth.api.getSession({
    headers: req.headers,
  });
}
