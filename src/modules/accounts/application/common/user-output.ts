import { UserEntity } from "~/modules/accounts/domain";

export type UserOutput = {
    id: string;
    name: string;
    email: string;
    phone: string;
  };
  
  export class UserOutputMapper {
    static toOutput(entity: UserEntity): UserOutput {
      return entity.toJSON()
    }
  }