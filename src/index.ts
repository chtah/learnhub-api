import express from "express";
import { PrismaClient } from "@prisma/client";
import { ICourseRepository, IUserRepository } from "./repositories";
import { ICourseHandler, IUserHandler } from "./handlers";
import UserRepository from "./repositories/user";
import UserHandler from "./handlers/user";
import JWTMiddleware from "./middleware/jwt";
import CourseRepository from "./repositories/course";
import CourseHandler from "./handlers/course";
import cors from "cors";

const clnt = new PrismaClient();
const PORT = Number(process.env.PORT || 8888);
const app = express();

const userRepo: IUserRepository = new UserRepository(clnt);
const userHandler: IUserHandler = new UserHandler(userRepo);

const courseRepo: ICourseRepository = new CourseRepository(clnt);
const courseHandler: ICourseHandler = new CourseHandler(courseRepo);

const jwtMiddleware = new JWTMiddleware();

app.use(express.json());
app.use(cors());

//------------------------------------------------------------
app.get("/", jwtMiddleware.auth, (req, res) => {
  console.log(res.locals);
  return res.status(200).send("Welcome to API").end();
});

app.post("/register", jwtMiddleware.auth, userHandler.registration);
app.post("/login", userHandler.login);

//------------------------------------------------------------

const authRouter = express.Router();

app.use("/auth", authRouter);
authRouter.get("/me", jwtMiddleware.auth, userHandler.selfcheck);

//------------------------------------------------------------

const courseRouter = express.Router();

app.use("/course", courseRouter);
courseRouter.get("/:id", courseHandler.getById);

//------------------------------------------------------------

app.listen(PORT, () => {
  console.log(`API is up at ${PORT}`);
});
