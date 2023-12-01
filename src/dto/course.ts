import { course, menu, submenu, topic } from "@prisma/client";

export interface ICourseDto extends course {
  menu: IMenuDto[];
}

export interface IMenuDto extends Omit<menu, "courseId"> {
  submenu: ISubmenuDto[];
}

export interface ISubmenuDto extends Omit<submenu, "menuId"> {
  topic: ITopicDto[];
}

export interface ITopicDto extends Omit<topic, "submenuId"> {}
