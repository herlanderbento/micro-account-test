import { Entity } from '../entities/entity';
import { SearchParams } from './search-params';
import { SearchResult } from './search-result';

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>;
  findById(id: string): Promise<E | null>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<E | null>;
  delete(id: string): Promise<void>;
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParams<Filter>,
  SearchOutput = SearchResult
> extends RepositoryInterface<E> {
  search(props: SearchInput): Promise<SearchOutput>;
}
