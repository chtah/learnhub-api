import { course, menu, submenu, topic } from "@prisma/client";

export interface ICourseDto extends course {}

export interface IMenuDto extends Omit<menu, "courseId"> {}

export interface ISubmenuDto extends Omit<submenu, "menuId"> {}

export interface ITopicDto extends Omit<topic, "submenuId"> {}
