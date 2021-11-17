import jwt from "jsonwebtoken";

export function generateToken(customObject: object, options: jwt.SignOptions) {
  const token = jwt.sign(customObject, process.env.SECRET!, options);
  return `Bearer ${token}`;
}

export function futureOffset(offsetMillis: number) {
  const now = new Date().getTime();
  return new Date(now + offsetMillis);
}

export function makeError(message: string) {
  return { error: message };
}

export function createCode() {
  return (Math.random() + 1).toString(16).substring(2, 8);
}
