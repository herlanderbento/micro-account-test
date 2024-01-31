export interface IGeneratorgrayToken {
  encrypt(payload: Record<string, unknown>): Promise<string>;
  decrypt<T>(payload: Record<string, unknown>): Promise<T>;
}
