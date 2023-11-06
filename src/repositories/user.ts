import { PrismaClient, user } from "@prisma/client";
import { IUser, IUserRepository } from ".";
import { ICreateUserDto } from "../dto/user";

export default class UserRepository implements IUserRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async create(user: ICreateUserDto): Promise<IUser> {
    return await this.prisma.user.create({
      data: user,
      select: {
        id: true,
        name: true,
        username: true,
      },
    });
  }

  public async findByUsername(username: string): Promise<user> {
    return await this.prisma.user.findUniqueOrThrow({
      where: { username },
    });
  }

  public async findById(id: string): Promise<IUser> {
    return await this.prisma.user.findUniqueOrThrow({
      select: {
        id: true,
        name: true,
        username: true,
      },
      where: { id },
    });
  }
}
