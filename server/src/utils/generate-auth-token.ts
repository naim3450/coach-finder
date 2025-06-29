import jwt, { Secret } from "jsonwebtoken";
import config from "../app/config";

export function generateAuthToken(
  payload: {
    email?: string;
    role?: string;
    _id: string;
    gender?: string;
    account_type?: string;
  },
  expiresIn: string
): string {
  return jwt.sign(payload, config.jwt_secret as Secret, {
    expiresIn: expiresIn,
  });
}
