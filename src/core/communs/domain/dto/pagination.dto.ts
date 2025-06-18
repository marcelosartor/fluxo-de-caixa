export class PaginationDto {
  page: number
  rowsPerPage?: number
  rowsNumber?: number
  searchFilters?: string
  search?: string
  fixedFilters?: string
  where?: any
  order?: any
}
