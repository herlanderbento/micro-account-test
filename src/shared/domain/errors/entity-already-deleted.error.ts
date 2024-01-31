import { AppError } from "./app.errors";

export class EntityAlreadyDeletedError extends AppError {
  constructor() {
    super({
      name: 'Entity already deleted',
      message: 'Selected entity was already deleted',
      statusCode: 404
    })
  }
}

