import mongoose, { Schema } from "mongoose";
import { userRoles, userType } from "../../constants";
import { IUser } from "./user.interfaces";
import bcrypt from "bcryptjs";
import config from "../../config";

const UserSchema = new Schema<IUser>(
  {
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profile_picture: { type: String, required: false },
    gender: {
      type: String,
      enum: ["male", "female", "other"],
      default: "other",
    },
    phone: { type: String, required: false },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: [userRoles.ADMIN, userRoles.CONTRIBUTOR, userRoles.CUSTOMER],
      default: userRoles.CUSTOMER,
    },
    account_type: {
      type: String,
      enum: [
        userType.ADVANCE,
        userType.BASIC,
        userType.ESSENTIAL,
        userType.PREMIUM,
      ],
      default: userType.BASIC,
    },
    email_verified: { type: Boolean, default: false },
    verification_code: { type: Number },
    expire_at: {
      type: Date,
    },
    quiz: {
      type: [
        {
          question: { type: String, required: true },
          answer: {
            type: Schema.Types.Mixed,
            validate: {
              validator: function (value: any) {
                return (
                  typeof value === "string" ||
                  (Array.isArray(value) &&
                    value.every((v) => typeof v === "string"))
                );
              },
              message: "Answer must be a string or an array of strings",
            },
          },
        },
      ],
      default: [],
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Encrypting password
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    // Hash the password
    this.password = await bcrypt.hash(
      this.password,
      Number(config.bcrypt_salt_rounds)
    );
  }
  next();
});

// Removing password from response
UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

// Compare password method
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model<IUser>("User", UserSchema);
export default User;
