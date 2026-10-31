import type { Request, Response, NextFunction } from "express";

export const serviceAuthMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const serviceToken = req.headers["x-service-token"];
  const secret = process.env.SERVICE_SECRET;

  if (!secret) {
    return res.status(500).json({
      message: "Service configuration error",
    });
  }

  if (
    typeof serviceToken !== "string" ||
    serviceToken !== secret
  ) {
    return res.status(401).json({
      message: "Unauthorized service",
    });
  }

  next();
};