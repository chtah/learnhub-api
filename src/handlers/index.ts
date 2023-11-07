import { RequestHandler } from "express";
import { ICreateUserDto, IUserDto } from "../dto/user";
import { IErrorDto } from "../dto/error";
import { ICredentialDto, ILoginDto } from "../dto/auth";
import { AuthStatus } from "../middleware/jwt";
import { ICourseDto } from "../dto/course";

export interface IUserHandler {
  registration: RequestHandler<{}, IUserDto | IErrorDto, ICreateUserDto>;
  login: RequestHandler<{}, ICredentialDto | IErrorDto, ILoginDto>;
  selfcheck: RequestHandler<
    {},
    Omit<IUserDto, "id"> | IErrorDto,
    unknown,
    unknown,
    AuthStatus
  >;
}

export interface ICourseHandler {
  getById: RequestHandler<{ id: string }, ICourseDto | IErrorDto>;
}
