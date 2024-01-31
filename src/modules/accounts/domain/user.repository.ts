import {
  SearchParams,
  SearchResult,
  SearchableRepositoryInterface,
} from '~/shared';
import { UserEntity } from './user.entity';
export type UserFilter = string;

export class UserSearchParams extends SearchParams<UserFilter> {}

export class UserSearchResult extends SearchResult<UserEntity> {}

export interface IUserRepository
  extends Omit<
    SearchableRepositoryInterface<
      UserEntity,
      UserFilter,
      UserSearchParams,
      UserSearchResult
    >,
    'delete' | 'findAll'
  > {
  findByEmail(email: string): Promise<UserEntity | null>;
  findByPhone(phone: string): Promise<UserEntity | null>;
}
