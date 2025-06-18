export class Credential {
  constructor(
    private readonly client: string = '',
    readonly accessToken: string = '',
  ) {
    client = client
    accessToken = accessToken
  }
}
