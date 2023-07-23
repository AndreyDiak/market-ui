import { ROLES } from "../user";

export interface UserLoginData {
   email: string;
   password: string;
}

export interface UserSignupData extends UserLoginData {
   name: string;
   repeat: string;
}

export interface UserErrorRes {
   statusCode: number;
   message: string | string[];
}

export interface UserSignupRes {}

export interface UserLoginRes {
   user: {
      userId: number;
      email: string;
      name: string;
      role: ROLES;
   };
   message: string;
}
