export interface IUserDto {
  id: string;
  name: string;
  username: string;
}

export interface ICreateUserDto {
  name: string;
  username: string;
  password: string;
}
