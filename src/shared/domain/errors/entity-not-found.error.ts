import { AppError } from "./app.errors"

export class EntityNotFoundError extends AppError {
  constructor(entity: string) {
    super({
      name: 'ENTITY_NOT_FOUND',
      message: `Entity ${entity} could not found`,
      statusCode: 404
    })
  }
}

