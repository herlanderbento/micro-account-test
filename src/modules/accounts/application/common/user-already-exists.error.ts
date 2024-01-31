import { AppError } from '~/shared';

export class UserAlreadyExistsError extends AppError {
  constructor(entity?: string) {
    super({
      name: 'UserAlreadyExistsError',
      message: `User ${entity} already exists.`,
      statusCode: 400,
    });
  }
}
