import express from "express";
import { PrismaClient } from "@prisma/client";
import { IUserRepository } from "./repositories";
import { IUserHandler } from "./handlers";
import UserRepository from "./repositories/user";
import UserHandler from "./handlers/user";
import JWTMiddleware from "./middleware/jwt";

const clnt = new PrismaClient();
const PORT = Number(process.env.PORT || 8888);
const app = express();

const userRepo: IUserRepository = new UserRepository(clnt);
const userHandler: IUserHandler = new UserHandler(userRepo);

const jwtMiddleware = new JWTMiddleware();

app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`API is up at ${PORT}`);
});
