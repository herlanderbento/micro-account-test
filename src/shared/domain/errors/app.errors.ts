export interface AppErrorProps {
  name: string;
  message: string;
  statusCode: number;
}
export class AppError extends Error {
  public readonly name: string;
  public readonly message: string;
  public readonly statusCode: number;

  constructor({ name, message, statusCode }: AppErrorProps) {
    super(message);

    this.name = name;
    this.message = message;
    this.statusCode = statusCode;
  }
}
