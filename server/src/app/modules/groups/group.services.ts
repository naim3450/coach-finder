import { JwtPayload } from "jsonwebtoken";
import { IServiceResponse } from "../../interfaces/service-response";
import { IGroup } from "./group.interfaces";
import { userRoles, userType } from "../../constants";
import { StatusCodes } from "http-status-codes";
import Group from "./group.models";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import { QueryBuilder } from "qgenie";
import AppError from "../../errors/app-error";
import User from "../users/user.models";

async function getGroupsFromDb(
  query: Record<string, unknown>
): Promise<IServiceResponse> {
  const { archived: _, ...queryObjWithoutArchive } = query;
  const queryBuilder = new QueryBuilder(Group.find(), {
    ...queryObjWithoutArchive,
    isDeleted: false,
    isArchived:
      query.archived === "true"
        ? true
        : query.archived === "false"
        ? false
        : false,
  })
    .search(["name", "city", "country", "about"])
    .filter()
    .sort()
    .paginate()
    .populate(["user"]);

  const groups = await queryBuilder.executeWithMetadata();

  return {
    success: true,
    status: StatusCodes.OK,
    message: "Groups retrieved successfully",
    data: groups,
  };
}

async function getSingleGroupFromDb(
  user: JwtPayload,
  groupId: string
): Promise<IServiceResponse> {
  const isValidGroupIdFormat = mongoose.Types.ObjectId.isValid(groupId);

  if (!isValidGroupIdFormat) {
    return {
      success: false,
      status: StatusCodes.BAD_REQUEST,
      message: "Invalid group id format",
      data: null,
    };
  }

  const result = await Group.findOne({
    _id: groupId,
    isDeleted: false,
    isArchived: false,
  }).populate("user");

  if (!result) {
    return {
      success: false,
      status: StatusCodes.NOT_FOUND,
      message: "Group not found with that id",
      data: null,
    };
  }

  const isAlreadyVisit = result.visitors.some(
    (visitor) => String(visitor.id) === user._id
  );

  if (!isAlreadyVisit) {
    result.visitors.push({
      id: new mongoose.Types.ObjectId(user._id),
      gender: user.gender,
    });
    await result.save();
  }

  // count total visitors
  const totalVisitors = result.visitors.length;

  // count male, female and other
  const maleCount = result.visitors.filter(
    (visitor) => visitor.gender === "male"
  ).length;

  const femaleCount = result.visitors.filter(
    (visitor) => visitor.gender === "female"
  ).length;

  const otherCount = result.visitors.filter(
    (visitor) => visitor.gender === "other"
  ).length;

  // Calculate percentages
  const malePercentages = parseFloat(
    ((maleCount / totalVisitors) * 100).toFixed(2)
  );
  const femalePercentage = parseFloat(
    ((femaleCount / totalVisitors) * 100).toFixed(2)
  );
  const otherPercentage = parseFloat(
    ((otherCount / totalVisitors) * 100).toFixed(2)
  );
  const { visitors: _, ...dataWithoutVisitors } = result.toObject();
  const resultForResponse = {
    ...dataWithoutVisitors,
    viewers: {
      total: totalVisitors,
      male: malePercentages,
      female: femalePercentage,
      others: otherPercentage,
    },
  };

  return {
    status: StatusCodes.OK,
    success: true,
    message: "Group retrieved successfully",
    data: resultForResponse,
  };
}

async function createNewGroupIntoDb(
  user: JwtPayload,
  payloads: IGroup[]
): Promise<IServiceResponse> {
  const restrictedPayloadFound = payloads.some(
    (payload) =>
      payload.cover_picture || payload.video || payload.promotional_banner
  );

  const authUser = await User.findById(user._id);

  if (!authUser) {
    throw new AppError(404, "User not found with that token");
  }

  if (
    restrictedPayloadFound &&
    user.role !== userRoles.ADMIN &&
    authUser.account_type === userType.BASIC
  ) {
    return {
      success: false,
      status: StatusCodes.BAD_REQUEST,
      message: "Invalid payload. May need to upgrade current plan.",
      data: null,
    };
  }

  const isAlreadyCrated = await Group.find({
    user: user._id,
    isDeleted: false,
  });

  if (user.role === userRoles.CONTRIBUTOR && isAlreadyCrated.length) {
    throw new AppError(401, "You cannot create multiple group");
  }

  const results = await Promise.all(
    payloads.map(async (payload) => {
      const { user: _, ...groupData } = payload;
      return Group.create({ user: user._id, ...groupData });
    })
  );

  return {
    status: StatusCodes.CREATED,
    success: true,
    message: "Group(s) successfully created",
    data: results,
  };
}

async function updateGroupIntoDb(
  user: JwtPayload,
  groupId: string,
  payload: Partial<IGroup>
): Promise<IServiceResponse> {
  const isValidGroupIdFormat = ObjectId.isValid(groupId);
  const isRestrictedPayloadFound = !!(payload.cover_picture || payload.video);

  const authUser = await User.findById(user._id);

  if (!authUser) {
    throw new AppError(404, "User not found with that token");
  }

  if (!isValidGroupIdFormat) {
    return {
      status: StatusCodes.BAD_REQUEST,
      success: false,
      message: "Invalid group id format. Expect valid ObjectId",
      data: null,
    };
  }
  if (
    isRestrictedPayloadFound &&
    user.role !== userRoles.ADMIN &&
    authUser.account_type === userType.BASIC
  ) {
    return {
      success: false,
      status: StatusCodes.BAD_REQUEST,
      message: "invalid payload. may need to upgrade current plan",
      data: null,
    };
  }

  const group = await Group.findOne({
    _id: groupId,
    isDeleted: false,
  });

  if (!group) {
    return {
      status: StatusCodes.NOT_FOUND,
      success: false,
      message: "Group not found with that id",
      data: null,
    };
  }

  if (String(group.user) !== user._id && user.role !== userRoles.ADMIN) {
    return {
      status: StatusCodes.UNAUTHORIZED,
      success: false,
      message: "You have no perform this operation",
      data: null,
    };
  }
  const updateGroup = await Group.findOneAndUpdate({ _id: groupId }, payload, {
    new: true,
  });

  return {
    status: StatusCodes.OK,
    success: true,
    message: "Group successfully updated",
    data: updateGroup,
  };
}

async function archiveGroupsIntoDb(
  user: JwtPayload,
  groupIds: string[]
): Promise<IServiceResponse> {
  const archivedGroups: string[] = [];
  const restoredGroup: string[] = [];

  for (const groupId of groupIds) {
    if (ObjectId.isValid(groupId)) {
      const group = await Group.findOne({
        _id: groupId,
        isDeleted: false,
      });

      if (group) {
        if (String(group.user) === user._id || user.role === userRoles.ADMIN) {
          group.isArchived = !group.isArchived;
          await group.save();
          if (group.isArchived) {
            archivedGroups.push(groupId);
          } else {
            restoredGroup.push(groupId);
          }
        }
      }
    }
  }

  return {
    status: StatusCodes.OK,
    success: true,
    message: "Group(s) successfully archived/restored",
    data: {
      archivedGroups,
      restoredGroup,
    },
  };
}

async function deleteGroupFromDb(
  user: JwtPayload,
  groupIds: string[]
): Promise<IServiceResponse> {
  const deletedGroups: string[] = [];

  for (const groupId of groupIds) {
    if (ObjectId.isValid(groupId)) {
      const group = await Group.findOne({
        _id: groupId,
        isDeleted: false,
        isArchived: true,
      });

      if (group) {
        if (String(group.user) === user._id || user.role === userRoles.ADMIN) {
          group.isDeleted = true;
          await group.save();
          deletedGroups.push(groupId);
        }
      }
    }
  }

  return {
    status: StatusCodes.OK,
    success: true,
    message: "Group(s) successfully deleted",
    data: {
      deletedGroups,
    },
  };
}

export const GroupServices = {
  createNewGroupIntoDb,
  updateGroupIntoDb,
  deleteGroupFromDb,
  getGroupsFromDb,
  getSingleGroupFromDb,
  archiveGroupsIntoDb,
};
