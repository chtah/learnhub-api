import { course, menu, submenu, topic } from "@prisma/client";

export interface ICourseDto extends Omit<course, "id"> {
  menu: IMenuDto[];
}

export interface IMenuDto extends Omit<menu, "id" | "courseId"> {
  submenu: ISubmenuDto[];
}

export interface ISubmenuDto extends Omit<submenu, "id" | "menuId"> {
  topic: ITopicDto[];
}

export interface ITopicDto extends Omit<topic, "id" | "submenuId"> {}
