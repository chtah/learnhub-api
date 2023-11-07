import { Prisma, PrismaClient } from "@prisma/client";
import { ICourseRepository } from ".";
import { ICourseDto } from "../dto/course";

export default class CourseRepository implements ICourseRepository {
  private prisma: PrismaClient;
  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }

  public async getById(id: number): Promise<ICourseDto> {
    return await this.prisma.course.findUniqueOrThrow({
      where: { id },
      include: {
        menu: {
          include: {
            submenu: {
              include: {
                topic: true,
              },
            },
          },
        },
      },
    });
  }
}
