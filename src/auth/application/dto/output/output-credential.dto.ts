import { Expose } from 'class-transformer'

export class OutputCredentialDto {
  @Expose()
  public client: string

  @Expose()
  public accessToken: string
}
