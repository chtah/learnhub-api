import { user } from "@prisma/client";
import { ICreateUserDto } from "../dto/user";

export interface IUser {
  id: string;
  name: string;
  username: string;
}

export interface IUserRepository {
  create(user: ICreateUserDto): Promise<IUser>;
  findByUsername(username: string): Promise<user>;
  findById(id: string): Promise<IUser>;
}
