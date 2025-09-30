// src/auth/requireAuth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const REQUIRED_AUD = process.env.JWT_AUD || "fastfood-api";

export interface AuthClaims {
  sub: string;
  cpf: string;
  name?: string;
  aud: string;
  iat: number;
  exp: number;
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ error: "missing bearer token" });
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) return res.status(500).json({ error: "JWT secret not configured" });

  try {
    const payload = jwt.verify(token, secret, {
      algorithms: ["HS256"],
      audience: REQUIRED_AUD,
    }) as AuthClaims;

    (req as any).user = payload;
    return next();
  } catch {
    return res.status(401).json({ error: "invalid or expired token" });
  }
}
