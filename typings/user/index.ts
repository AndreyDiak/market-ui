export enum ROLES {
   USER = "user",
   ADMIN = "admin",
}

export type UserById = Pick<User, "email" | "id" | "name">;

export interface User {
   id: number;
   name: string;
   email: string;
   role: ROLES;
   balance: number;
   createdAt: Date;
   updatedAt: Date;
}
