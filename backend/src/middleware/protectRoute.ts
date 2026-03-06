import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth";
import { fromNodeHeaders } from "better-auth/node";

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
