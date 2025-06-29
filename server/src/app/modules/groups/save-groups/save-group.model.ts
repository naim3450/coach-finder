import mongoose, { model, Schema } from "mongoose";
import { ISaveGroup } from "./save-group.interfaces";

const saveGroupSchema = new Schema<ISaveGroup>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Group",
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const SaveGroup = model<ISaveGroup>("SaveGroup", saveGroupSchema);
export default SaveGroup;
