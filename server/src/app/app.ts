import cors from "cors";
import express, { Application, Request, Response } from "express";
import cookieParser from "cookie-parser";
import { StatusCodes } from "http-status-codes";
import globalErrorHandler from "./middlewares/global-error-handler";
import { applicationRoutes } from "./routes";
import transporter from "./emails/transporter";
import adminSubscriptionNotificationTemplate from "./emails/adminSubscriptionNotificationTemplate";
import config from "./config";

const app: Application = express();

// Middlewares
app.use(
  cors({
    origin: [
      "https://dashboard.coachfinder.app",
      "https://group.coachfinder.app",
      "https://coachfinder.app",
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:5173",
      "http://localhost:5174",
    ],
  })
);
app.use(cookieParser());
app.use(express.json());

// test route
app.get("/", (_, res: Response) => {
  res.send("Hello World!");
});

app.post("/api/v1/subscribe", async function (req: Request, res: Response) {
  if (!req.query.email) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "Subscriber email address not provided",
    });
  }

  const sendEmail = await transporter.sendMail({
    to: config.email_sender_address,
    subject: "New Subscription Notification - Coach Finder",
    html: adminSubscriptionNotificationTemplate({
      subscriberEmail: req.query.email as string,
    }),
  });

  if (!sendEmail.accepted.length) {
    res.status(400).json({
      success: false,
      status: 400,
      message: "Email not sended",
    });
  }

  res.status(200).json({
    success: true,
    status: 200,
    message: "Subscription success",
  });
});

// application routes
app.use("/api/v1", applicationRoutes);

// error handler
app.use(globalErrorHandler);

// not found route
app.use((_, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    status: StatusCodes.NOT_FOUND,
    message: "Endpoint not found",
  });
});

export default app;
