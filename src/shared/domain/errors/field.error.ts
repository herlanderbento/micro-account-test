import { AppError } from "./app.errors";

export class FieldError extends AppError {
  constructor(entity: string, field: string) {
    super({
      name: 'FIELD_ERROR',
      message: `${entity}: ${field} was not properly set`,
      statusCode: 400
    })
  }
}

