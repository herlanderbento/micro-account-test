import { CreateUserUseCase } from '~/modules/accounts/application/use-cases/create-user';
import { UserMongoRepository } from '../../db/mongo/user-mongo.repository';
import { UserModel } from '../../db/mongo/user.model';
import { CreateUserController } from '../controllers';
import { BcryptHasher, JwtEncrypter } from '../../cryptography';

const repository = new UserMongoRepository(UserModel);
const criptographyHasher = new BcryptHasher();
const jwtEncrypter = new JwtEncrypter();
const useCase = new CreateUserUseCase(
  repository,
  criptographyHasher,
  jwtEncrypter
);
const controller = new CreateUserController(useCase);

export default controller;
