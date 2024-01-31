import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ListUsersUseCase } from '~/modules/accounts/application/use-cases';

export class ListUsersController {
  constructor(private readonly listUsersUseCase: ListUsersUseCase) {}

  async handle(request: Request, response: Response) {
    const ouput = await this.listUsersUseCase.execute(request.query);

    return response.status(StatusCodes.OK).json({
      data: ouput,
    });
  }
}
