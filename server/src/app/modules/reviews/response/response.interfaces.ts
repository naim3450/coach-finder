import { Document, ObjectId } from "mongoose";

export interface IResponse extends Document {
  user: ObjectId;
  review: ObjectId;
  description: string;
}
