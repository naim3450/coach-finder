import { Document, ObjectId } from "mongoose";

export interface ISaveGroup extends Document {
  user: ObjectId;
  group: ObjectId;
}
