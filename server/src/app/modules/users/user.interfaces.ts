import { userRoles, userType } from "../../constants";
import { Document } from "mongoose";

export interface IQuiz {
  question: string;
  answer: String;
}

export interface IUser extends Document {
  first_name: string;
  last_name: string;
  profile_picture?: string;
  gender: "male" | "female" | "other";
  phone?: string;
  email: string;
  password: string;
  role:
    | typeof userRoles.ADMIN
    | typeof userRoles.CONTRIBUTOR
    | typeof userRoles.CUSTOMER;
  account_type?:
    | typeof userType.ADVANCE
    | typeof userType.BASIC
    | typeof userType.ESSENTIAL
    | typeof userType.PREMIUM;
  email_verified?: boolean;
  verification_code?: number;
  expire_at?: Date;
  quiz?: IQuiz[];
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}
