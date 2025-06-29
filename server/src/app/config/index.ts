import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  mongodb_uri: process.env.DB_CONNECTION_STRING,
  port: process.env.PORT,
  frontend_url: process.env.FRONTEND_URL,
  jwt_secret: process.env.JWT_SECRET,
  bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
  email_sender_address: process.env.EMAIL_SENDER_ADDRESS,
  email_sender_app_password: process.env.EMAIL_SENDER_APP_PASSWORD,
  stripe_secret_key: process.env.STRIPE_SECRET_KEY,
};
