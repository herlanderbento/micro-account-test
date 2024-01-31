import { EntityAlreadyDeletedError } from '../errors';
import { Entity, IEntity } from './entity';

export type ISoftDeletableEntity = IEntity & { deletedAt: Date | null };

export abstract class SoftDeletableEntity<
  Properties = null
> extends Entity<Properties> {
  private _deletedAt: Date | null = null;

  constructor(properties: Properties, base?: ISoftDeletableEntity) {
    super(properties, base);

    if (base) {
      this._deletedAt = base.deletedAt;
    }
  }

  get deletedAt(): Date | null {
    return this._deletedAt;
  }

  set deletedAt(value: Date | null) {
    this._deletedAt = value;
  }

  get isDeleted(): boolean {
    return !!this._deletedAt;
  }

  delete(): void {
    if (this._deletedAt) {
      throw new EntityAlreadyDeletedError();
    }

    this._deletedAt = new Date();
  }

  restore(): void {
    this._deletedAt = null;
  }
}
