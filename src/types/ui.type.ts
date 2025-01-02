export interface PageMeta {
  pageNo: number
  pageSize: number
  totalPage: number
  totalCount: number
}

export interface PageRequest {
  page?: number
  size?: number
}

export interface PaginatedResponse<T> {
  list: T[]
  meta: PageMeta
}
