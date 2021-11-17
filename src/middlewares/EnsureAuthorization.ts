import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { HEADERS } from "../constants";
import { generateToken } from "../helpers";

const SECRET = process.env.SECRET as string;

export function ensureAuthorization(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authHeader = req.headers[HEADERS.AUTH] as string;

  if (!authHeader) {
    return res.status(401).send({ error: "No token provided" });
  }

  // Bearer aab9c9df0g7e173499d7f891d918a912bd2f
  const parts = authHeader.split(" ");

  if (parts.length !== 2) {
    return res.status(401).send({ error: "Token error" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ error: "Token malformatted" });
  }

  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({ error: "Token invalid" });
    }

    const token = generateToken({ id: decoded!.id }, { expiresIn: "30d" });

    req._id = decoded!.id;
    res.setHeader(HEADERS.AUTH, token);
    return next();
  });
}
