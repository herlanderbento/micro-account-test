import jwt from 'jsonwebtoken'
import { IGeneratorgrayToken } from '../../../../shared/application/generator-token'

export class JwtEncrypter implements IGeneratorgrayToken {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return jwt.sign(payload, String(process.env.JWT_SECRET))
  }

  async decrypt<JwtPayload>(
    payload: Record<string, unknown>
  ): Promise<JwtPayload> {
    return Promise.resolve(
      jwt.verify(String(payload), String(process.env.JWT_SECRET)) as JwtPayload
    )
  }
}
