import { RequestHandler } from "express";
import { IUserHandler } from ".";
import { IUserRepository } from "../repositories";
import { ICreateUserDto, IUserDto } from "../dto/user";
import { IErrorDto } from "../dto/error";
import { hashPassword, verifyPassword } from "../utils/bcrypt";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ICredentialDto, ILoginDto } from "../dto/auth";
import { JWT_SECRET } from "../utils/const";
import { sign } from "jsonwebtoken";
import { AuthStatus } from "../middleware/jwt";

export default class UserHandler implements IUserHandler {
  private repo: IUserRepository;

  constructor(repo: IUserRepository) {
    this.repo = repo;
  }

  public registration: RequestHandler<
    {},
    IUserDto | IErrorDto,
    ICreateUserDto
  > = async (req, res) => {
    const { name, username, password: plainPassword } = req.body;

    if (typeof name !== "string" || name.length === 0) {
      return res.status(400).json({ message: "name is invalid" });
    }

    if (typeof username !== "string" || username.length === 0) {
      return res.status(400).json({ message: "username is invalid" });
    }

    if (typeof plainPassword !== "string" || plainPassword.length < 5) {
      return res.status(400).json({ message: "password is invalid" });
    }

    try {
      const {
        id: registerdId,
        name: registeredName,
        username: registeredUsername,
      } = await this.repo.create({
        name,
        username,
        password: hashPassword(plainPassword),
      });

      return res
        .status(201)
        .json({
          id: registerdId,
          name: registeredName,
          username: registeredUsername,
        })
        .end();
    } catch (error) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        return res.status(500).json({
          message: `name is invalid`,
        });
      }
      return res.status(500).json({
        message: `Internal Server Error`,
      });
    }
  };

  public login: RequestHandler<{}, ICredentialDto | IErrorDto, ILoginDto> =
    async (req, res) => {
      const { username, password: plainPassword } = req.body;
      try {
        const { password, id } = await this.repo.findByUsername(username);

        if (!verifyPassword(plainPassword, password))
          throw new Error("Invalid username or password");

        const accessToken = sign({ id }, JWT_SECRET, {
          algorithm: "HS512",
          expiresIn: "30d",
          issuer: "learnhub-api",
          subject: "user-credential",
        });
        return res.status(200).json({ accessToken }).end();
      } catch (error) {
        return res
          .status(401)
          .json({ message: "Invalid username or password" })
          .end();
      }
    };

  public selfcheck: RequestHandler<
    {},
    Omit<IUserDto, "id"> | IErrorDto,
    unknown,
    unknown,
    AuthStatus
  > = async (req, res) => {
    try {
      const { name, username } = await this.repo.findById(res.locals.user.id);

      return res.status(200).json({ name, username }).end();
    } catch (error) {
      console.error(error);

      return res.status(500).send({ message: "Internal Server Error" }).end();
    }
  };
}
