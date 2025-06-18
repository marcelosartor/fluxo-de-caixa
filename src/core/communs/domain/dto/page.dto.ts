import { Page } from 'src/core/communs/domain/interfaces/page.interface'

export class PageDto<T> implements Page<T> {
  contents: T[]
  rowsNumber: number
}
