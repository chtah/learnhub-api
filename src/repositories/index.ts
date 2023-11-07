import { course, topic, user } from "@prisma/client";
import { ICreateUserDto } from "../dto/user";
import { ICourseDto, IMenuDto, ISubmenuDto, ITopicDto } from "../dto/course";

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

export interface ICourseRepository {
  getById(id: number): Promise<ICourseDto>;
}
