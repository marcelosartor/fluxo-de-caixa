export class ClientCredential {
  constructor(pClient: string, pClientPassword: string, pUserName, pUserPassword: string, pGrantType: string) {
    this.client = pClient
    this.clientPassword = pClientPassword
    this.userName = pUserName
    this.userPassword = pUserPassword
    this.grantType = pGrantType
  }
  client: string
  clientPassword: string
  userName: string
  userPassword: string
  grantType: string
}
