import { IUserRepository, UserEntity } from '~/modules/accounts/domain';
import { ICryptographyHash, IGeneratorgrayToken, IUseCase } from '~/shared';
import { CreateUserInput } from './create-user.input';
import { UserAlreadyExistsError } from '../../common';

export class CreateUserUseCase
  implements IUseCase<CreateUserInput, CreateUserOutput>
{
  constructor(
    private userRepository: IUserRepository,
    private criptographyHasher: ICryptographyHash,
    private generatorToken: IGeneratorgrayToken
  ) {}

  async execute(input: CreateUserInput): Promise<CreateUserOutput> {
    const userWithSameEmail = await this.userRepository.findByEmail(
      input.email
    );

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError(userWithSameEmail.email);
    }

    const userWithSamePhone = await this.userRepository.findByPhone(
      input.phone
    );

    if (userWithSamePhone) {
      throw new UserAlreadyExistsError(userWithSamePhone.phone);
    }

    const hashedPassword = await this.criptographyHasher.hash(input.password);

    const entity = UserEntity.create({
      ...input,
      password: hashedPassword,
    });

    await this.userRepository.insert(entity);

    const accessToken = await this.generatorToken.encrypt({
      sub: entity.id,
    });

    return {
      accessToken,
      user: entity,
    };
  }
}

export type CreateUserOutput = {
  accessToken: string;
  user: UserEntity;
};
