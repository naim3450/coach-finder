import mongoose from "mongoose";
import { IGroup } from "./group.interfaces";

const visitorSchema = new mongoose.Schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
      required: true,
    },
  },
  {
    _id: false,
  }
);

const groupSchema = new mongoose.Schema<IGroup>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    industry: {
      type: [String],
      required: true,
    },
    goals: {
      type: [String],
      required: true,
    },
    focus_area: {
      type: [String],
      required: true,
    },
    key_topics: {
      type: [String],
      required: true,
    },
    about: {
      type: String,
      required: true,
      trim: true,
    },
    meeting_format: {
      type: String,
      required: true,
      trim: true,
    },
    pricing: {
      type: Number,
      required: true,
      trim: true,
    },
    registration_link: {
      type: String,
      required: true,
      trim: true,
    },
    review: {
      type: Boolean,
      required: true,
    },
    profile_picture: {
      type: String,
      required: true,
      trim: true,
    },
    cover_picture: {
      type: String,
      trim: true,
    },
    video: {
      type: String,
      trim: true,
    },
    promotional_banner: {
      type: String,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    visitors: {
      type: [visitorSchema],
      default: [],
    },
    isArchived: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);

const Group = mongoose.model<IGroup>("Group", groupSchema);
export default Group;
