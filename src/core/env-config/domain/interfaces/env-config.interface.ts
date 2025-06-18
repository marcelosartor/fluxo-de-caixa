export interface EnvConfig {
  getNodeEnv(): string
  getAppPort(): number
  
  getJwtSecret(): string
  getJwtExpiresInSeconds(): number

}
