import mongoose, { Document } from "mongoose";

export interface IReview extends Document {
  user: mongoose.Schema.Types.ObjectId;
  group: mongoose.Schema.Types.ObjectId;
  rating: number;
  review: string;
  isPending: boolean;
}
