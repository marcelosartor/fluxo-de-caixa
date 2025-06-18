import { ProblemType } from '../interfaces/problem-type.interface'

export class ProblemTypeModel {
  static URLBASE: string = 'https://fluxodecaixa.exceptions.teste.com.br'
  static SYSTEM_ERROR: ProblemType = { url: '/erro-de-sistema', title: 'Erro de sistema' }
  static REPOSITORY_ERROR: ProblemType = { url: '/erro-de-repositorio', title: 'Erro de repositorio' }
  static INVALID_DATA: ProblemType = { url: '/dados-invalidos', title: 'Dados inválidos' }

  static UNAUTHORIZED: ProblemType = { url: '/usuario-nao-autenticado', title: 'Usuario não autenticado' }
  static FORBIDDEN: ProblemType = { url: '/acesso-nao-autorizado', title: 'Acesso não autorizado' }
  static AUTH_EXISTS: ProblemType = { url: '/usuario-ja-cadastrado', title: 'Usuário já cadastrado' }

  static DOMAIN_RULE: ProblemType = { url: '/regra-de-dominio-inválida', title: 'Regra de dominio inválida' }
  static ENTITY_NOT_FOUND: ProblemType = { url: '/entidade-nao-encontrada', title: 'Entidade não encontrada' }

}
