import { IUseCase } from "../../../../../shared/application/use-case";
import { IUserRepository } from "../../../domain/user.repository";
import { UserProps } from "../../../domain/user.entity";
import { EntityAlreadyExistError } from "../../../../../shared/domain/errors/entity-already-exist.error";
import { UpdateUserInput } from "./update-user.input";
import { UserOutputMapper } from "../common/user-output";

export class UpdateUserUseCase
  implements IUseCase<UpdateUserInput, UpdateUserOutput>
{
  constructor(private userRepository: IUserRepository) {}

  async execute(input: UpdateUserInput): Promise<UpdateUserOutput> {
    const user = await this.userRepository.findById(input.id);

    if (!user) {
      throw new EntityAlreadyExistError();
    }

    if (input.email !== user.email) {
      const userWithSameEmail = await this.userRepository.findByEmail(
        input.email
      );

      if (userWithSameEmail) {
        throw new EntityAlreadyExistError();
      }
    }

    if (input.phone !== user.phone) {
      const userWithSamePhone = await this.userRepository.findByPhone(
        input.phone
      );

      if (userWithSamePhone) {
        throw new EntityAlreadyExistError();
      }
    }

    user.update(input);

    const entity = await this.userRepository.update(user);

    return entity ? UserOutputMapper.toOutput(entity) : null;
  }
}

export type UpdateUserOutput = UserProps | null;
