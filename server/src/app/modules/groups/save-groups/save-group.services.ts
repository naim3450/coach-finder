import { JwtPayload } from "jsonwebtoken";
import { IServiceResponse } from "../../../interfaces/service-response";
import { ObjectId } from "mongodb";
import AppError from "../../../errors/app-error";
import Group from "../group.models";
import SaveGroup from "./save-group.model";
import { QueryBuilder } from "qgenie";

async function retrieveSaveGroupsFromDb(
  userId: string
): Promise<IServiceResponse> {
  const queryBuilder = new QueryBuilder(SaveGroup.find(), {
    user: userId,
  });

  const result = await queryBuilder
    .sort()
    .filter()
    .populate(["user", "group"])
    .paginate()
    .executeWithMetadata();

  return {
    success: true,
    status: 200,
    message: "Saved groups successfully retrieved",
    data: result,
  };
}

async function saveUnsaveGroupIntoDb(
  user: JwtPayload,
  groupId: string
): Promise<IServiceResponse> {
  if (!ObjectId.isValid(groupId)) {
    throw new AppError(400, "Invalid group id format");
  }

  const group = await Group.findOne({
    _id: groupId,
    isDeleted: false,
    isArchived: false,
  });

  if (!group) {
    throw new AppError(404, "Group not found with that id");
  }

  const isAlreadySaved = await SaveGroup.findOne({
    user: user._id,
    group: groupId,
  }).populate("user");

  if (isAlreadySaved) {
    await SaveGroup.findOneAndDelete({
      user: user._id,
      group: groupId,
    });

    return {
      success: true,
      status: 200,
      message: "Group successfully removed from your list",
      data: isAlreadySaved,
    };
  } else {
    const result = await SaveGroup.create({
      user: user._id,
      group: groupId,
    });

    return {
      success: true,
      status: 201,
      message: "Group successfully added to your list",
      data: result,
    };
  }
}

export const saveGroupServices = {
  saveUnsaveGroupIntoDb,
  retrieveSaveGroupsFromDb,
};
