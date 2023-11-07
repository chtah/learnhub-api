import { RequestHandler } from "express";
import { ICourseHandler } from ".";
import { ICourseRepository } from "../repositories";
import { ICourseDto } from "../dto/course";
import { IErrorDto } from "../dto/error";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export default class CourseHandler implements ICourseHandler {
  private repo: ICourseRepository;
  constructor(repo: ICourseRepository) {
    this.repo = repo;
  }

  public getById: RequestHandler<{ id: string }, ICourseDto | IErrorDto> =
    async (req, res) => {
      const { id } = req.params;

      const numericId = Number(id);
      if (isNaN(numericId))
        return res.status(400).json({ message: "id is invalid" }).end();

      try {
        const course = await this.repo.getById(numericId);

        const mappedMenu = course.menu.map((menuItem) => {
          const { menu_title, submenu } = menuItem;
          const mappedSubmenu = submenu.map((submenuItem) => {
            const { submenu_title, topic } = submenuItem;
            const mappedTopics = topic.map((topicItem) => {
              const { topic_title, topic_description, topic_url } = topicItem;
              return { topic_title, topic_description, topic_url };
            });

            return { submenu_title, topic: mappedTopics };
          });
          return { menu_title, submenu: mappedSubmenu };
        });

        return res
          .status(200)
          .json({
            course_name: course.course_name,
            course_update_date: course.course_update_date,
            menu: mappedMenu,
          })
          .end();
      } catch (error) {
        if (
          error instanceof PrismaClientKnownRequestError &&
          error.code === "P2025"
        )
          return res
            .status(404)
            .json({
              message: error.message,
            })
            .end();
        console.log(error);
        return res.status(500).end();
      }
    };
}
