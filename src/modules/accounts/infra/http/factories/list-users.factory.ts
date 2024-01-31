import { ListUsersUseCase } from "~/modules/accounts/application/use-cases";
import { UserMongoRepository } from "../../db/mongo/user-mongo.repository";
import { UserModel } from "../../db/mongo/user.model";
import { ListUsersController } from "../controllers";

const repository = new UserMongoRepository(UserModel);

const useCase = new ListUsersUseCase(repository);

const controller = new ListUsersController(useCase);

export default controller;
