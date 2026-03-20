import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";

export const optionalAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await auth.api.getSession({ headers: req.headers });

  if (session) {
    req.user = {
      ...session.user,
      image: session.user.image ?? null,
      name: session.user.name ?? null,
      email: session.user.email ?? null,
    };
  }

  next();
};
export const protectRoute = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session || !session.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  (req as any).user = session.user;
  (req as any).session = session.session;
  next();
};
// middleware/auth.ts
