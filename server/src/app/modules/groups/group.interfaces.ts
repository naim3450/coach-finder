import mongoose, { Document, ObjectId, Types } from "mongoose";

interface IVisitor {
  id: Types.ObjectId;
  gender: "male" | "female" | "other";
}

export interface IGroup extends Document {
  name: string;
  country: string;
  city: string;
  industry: string[];
  goals: string[];
  focus_area: string[];
  key_topics: string[];
  about: string;
  meeting_format: string;
  pricing: number;
  registration_link: string;
  review: boolean;
  profile_picture: string;
  cover_picture?: string;
  promotional_banner?: string;
  video?: string;
  user: ObjectId;
  visitors: IVisitor[];
  createdAt?: Date;
  updatedAt?: Date;
  isArchived: boolean;
  isDeleted: boolean;
}
