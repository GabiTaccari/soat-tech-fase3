// src/auth/optionalAuth.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization || "";
  const [type, token] = header.split(" ");
  if (type === "Bearer" && token) {
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!, {
        algorithms: ["HS256"],
        audience: process.env.JWT_AUD || "fastfood-api"
      });
      (req as any).user = payload;
    } catch {
      // ignora se inválido, continua anônimo
    }
  }
  next();
}
