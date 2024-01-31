import { hash, compare } from 'bcryptjs';
import { ICryptographyHash } from '../../../../shared/application/cryptography-hash';

export class BcryptHasher implements ICryptographyHash {
  private HASH_SALT_LENGTH = 8;

  hash(plain: string): Promise<string> {
    return hash(plain, this.HASH_SALT_LENGTH);
  }

  compare(plain: string, hash: string): Promise<boolean> {
    return compare(plain, hash);
  }
}
