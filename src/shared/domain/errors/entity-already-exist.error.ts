import { StatusCodes } from 'http-status-codes'
import { AppError } from './app.errors'

export class EntityAlreadyExistError extends AppError {
  constructor() {
    super({
      name: 'Entity already deleted',
      message: 'Selected Entity was already created',
      statusCode: StatusCodes.NOT_FOUND
    })
  }
}

