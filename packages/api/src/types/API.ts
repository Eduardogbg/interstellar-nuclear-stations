import type { DataSources } from '../data-sources';


export type paginatorParams = {
  batch: number,
  pageSize: number,
  cursor?: number
}

export type paginationParams = {
  page: number,
  page_size: number
}

export interface AsyncPaginatedGetter<T> {
  (params: paginationParams): Promise<PaginatedResponse<T>>
}

export type PaginatedResponse<T> = {
  count: number,
  next?: number,
  previous?: string,
  results: T[]
}

export type CursorParams = {
  amount: number,
  cursor?: number
}

export type CursorResponse<T> = {
  cursor?: number,
  count: number,
  results: T[]
}

export interface AsyncCursorResolver<T> {
  (
    _source: any, 
    params: CursorParams,
    context: { dataSources: DataSources }
  ): Promise<CursorResponse<T>>
}
