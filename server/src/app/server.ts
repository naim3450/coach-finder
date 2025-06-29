import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import config from "./config";

let server: Server;

(async function () {
  console.log("Connecting to database...");
  try {
    await mongoose.connect(config.mongodb_uri as string);
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );

    server = app.listen(config.port || 8000, () => {
      console.log(`Coach Finder app listening on port ${config.port || 8000}`);
    });
  } catch (error) {
    console.log("There was a problem starting the server.", error);
  }
})();

// async error handle
process.on("unhandledRejection", () => {
  console.log("UnhandledRejection is detected! shutting down the server...");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// synchronies error handle
process.on("uncaughtException", () => {
  console.log("UncaughtException is detected! shutting down the server...");
  process.exit();
});
