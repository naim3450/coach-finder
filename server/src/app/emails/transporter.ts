import nodemailer from "nodemailer";
import config from "../config";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: config.email_sender_address,
    pass: config.email_sender_app_password,
  },
});

export default transporter;
