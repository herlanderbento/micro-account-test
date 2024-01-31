import { v4 as uuidv4 } from 'uuid';
import { FieldError } from '../errors/field.error';

export interface IEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export abstract class Entity<Properties = unknown> {
  protected _id: string;
  protected _createdAt: Date;
  protected _updatedAt: Date | undefined;

  constructor(public properties?: Properties, entity?: IEntity) {
    if (properties) {
      Object.assign(this, properties);
    }

    if (entity) {
      this._id = entity.id;
      this._createdAt = entity.createdAt;
      this.updatedAt = entity.updatedAt;

      return;
    }

    this._id = uuidv4();
    this._createdAt = this._updatedAt = new Date();
  }

  public get id(): string {
    return this._id;
  }

  public get createdAt(): Date {
    return this._createdAt;
  }

  public get updatedAt(): Date | undefined {
    return this._updatedAt;
  }

  public set updatedAt(value: Date | undefined) {
    if (value)
      if (value < this.createdAt) {
        const entityName = this.constructor.name.replace('Entity', '');
        throw new FieldError(entityName, 'updatedAt');
      }

    this._updatedAt = value;
  }

  toJSON(): Required<
    { id: string; createdAt: Date | null; updatedAt: Date | null } & Properties
  > {
    return {
      id: this.id,
      ...this.properties,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    } as Required<
      {
        id: string;
        createdAt: Date | null;
        updatedAt: Date | null;
      } & Properties
    >;
  }
}
