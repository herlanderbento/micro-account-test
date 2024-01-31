import { IUserModelDocument } from './user-model-document.interface';
import { UserEntity } from '~/modules/accounts/domain';

interface IUserModel {
  raw: IUserModelDocument 
}
export class UserModelMapper {
  static toModel(entity: UserEntity) {
    return {
      _id: entity.id,
      name: entity.name,
      email: entity.email,
      phone: entity.phone,
      password: entity.password,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      deletedAt: entity.deletedAt,
    };
  }

  static toEntity({ raw }: IUserModel): UserEntity {
    return new UserEntity(
      {
        name: raw.name,
        email: raw.email,
        password: raw.password,
        phone: raw.phone,
      },
      {
        id: String(raw._id),
        createdAt: raw.createdAt,
        updatedAt: raw.updatedAt,
        deletedAt: raw.deletedAt,
      }
    );
  }
}
