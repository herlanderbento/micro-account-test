import { SoftDeletableEntity } from "~/shared/domain/entities/soft-deletable-entity";

export type UserProps = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export class UserEntity extends SoftDeletableEntity<UserProps> {
  private _name: string;
  private _email: string;
  private _phone: string;
  private _password: string;

  get name() {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get email() {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get phone() {
    return this._phone;
  }

  set phone(value: string) {
    this._phone = value;
  }

  get password() {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  static create(props: UserProps): UserEntity {
    const user = new UserEntity(props);
    return user;
  }

  update(props: Partial<UserProps>) {
    Object.assign(this, { ...props });
  }
}
