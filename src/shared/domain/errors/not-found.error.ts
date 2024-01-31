import { AppError } from "./app.errors";

export class NotFoundError extends AppError {
  constructor(entity: string) {
    super({
      name: 'NOT_FOUND_ERROR',
      message: `Entity ${entity} Not Found`,
      statusCode: 404,
    });
  }
}
