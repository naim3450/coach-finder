import mongoose, { model, Schema } from "mongoose";
import { IResponse } from "./response.interfaces";

const responseSchema = new Schema<IResponse>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    review: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Response = model<IResponse>("Response", responseSchema);

export default Response;
