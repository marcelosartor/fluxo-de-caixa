export interface ProblemMessage {
  status: number
  type: string
  title: string
  detail: string
  timestamp: string
  fields?: any[]
}
