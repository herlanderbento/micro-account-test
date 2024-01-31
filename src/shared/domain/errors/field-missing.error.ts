import { AppError } from "./app.errors";

export class FieldMissingError extends AppError {
  constructor(field: string) {
    super({
      name: `${field} is missing`,
      message: `${field} could not be found`,
      statusCode:400
    })
  }
}

