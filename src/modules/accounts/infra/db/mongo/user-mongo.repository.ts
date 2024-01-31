import {
  IUserRepository,
  UserEntity,
  UserSearchParams,
  UserSearchResult,
} from '~/modules/accounts/domain';
import { UserModelMapper } from './user-model.mapper';
import { UserModel } from './user.model';

export class UserMongoRepository implements IUserRepository {
  constructor(private userModel: typeof UserModel) {}

  async insert(entity: UserEntity): Promise<void> {
    const modelProps = UserModelMapper.toModel(entity);
    await this.userModel.create(modelProps);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    const model = await this.userModel.findOne({
      email,
      deletedAt: null,
    });

    return model ? UserModelMapper.toEntity({ raw: model }) : null;
  }

  async findByPhone(phone: string): Promise<UserEntity | null> {
    const model = await this.userModel.findOne({
      phone,
      deletedAt: null,
    });

    return model ? UserModelMapper.toEntity({ raw: model }) : null;
  }

  async findById(id: string): Promise<UserEntity | null> {
    const model = await this.userModel.findOne({
      _id: id,
      deletedAt: null,
    });

    return model ? UserModelMapper.toEntity({ raw: model }) : null;
  }

  async update(entity: UserEntity): Promise<UserEntity | null> {
    const model = await this.userModel.findByIdAndUpdate(
      entity.id,
      UserModelMapper.toModel(entity)
    );

    return model ? UserModelMapper.toEntity({ raw: model }) : null;
  }

  async search(props: UserSearchParams): Promise<UserSearchResult> {
    const skip = (props.page - 1) * props.perPage;
    const limit = props.perPage;

    const models = await this.userModel
      .find({
        ...(props.filter && {
          $or: [
            { name: { $regex: new RegExp(props.filter, 'i') } },
            { email: { $regex: new RegExp(props.filter, 'i') } },
          ],
        }),
      })
      .skip(skip)
      .limit(limit)
      .lean();

    const count = await this.userModel.countDocuments(models);

    return new UserSearchResult({
      items: models.map((model) => {
        return UserModelMapper.toEntity({ raw: model });
      }),
      currentPage: props.page,
      perPage: props.perPage,
      total: count,
    });
  }
}
