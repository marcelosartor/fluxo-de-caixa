import { Injectable } from '@nestjs/common'
import { ClientCredential } from 'src/auth/domain/models/client-credential.model'
import { Credential } from 'src/auth/domain/models/credential.model'
import { OutputCredentialDto } from '../dto/output/output-credential.dto'
import { plainToClass } from 'class-transformer'
import { InputClientCredentialDto } from '../dto/input/input-client-credential.dto'
import { OutputCheckCredentialDto } from '../dto/output/output-check-credential.dto'
import { InputCheckCredentialDto } from '../dto/input/input-check-credential.dto'
//import { InputCheckCredentialDto } from '../dto/input/input-check-credential.dto'
//import { OutputCheckCredentialDto } from '../dto/output/output-check-credential.dto'

@Injectable()
export class CredentialMapper {
  disassembler(pHeaders: any, clientCredentialDto: InputClientCredentialDto): ClientCredential {
    let pPassword = clientCredentialDto['password']

    return new ClientCredential(
      clientCredentialDto.client,
      '',
      clientCredentialDto.username,
      pPassword,
      clientCredentialDto.grant_type,
    )
  }

  

  assembler(credential: Credential): OutputCredentialDto {
    const dto: OutputCredentialDto = plainToClass<OutputCredentialDto, Credential>(OutputCredentialDto, credential, {
      excludeExtraneousValues: true,
      enableImplicitConversion: true,
    })
    return dto
  }

  
  assemblerCheck(message: string): OutputCheckCredentialDto {
    const dto: OutputCheckCredentialDto = new OutputCheckCredentialDto()
    dto.message = message
    return dto
  }
  disassemblerCheck(checkCredentialDto: InputCheckCredentialDto): Credential {
    return new Credential('', checkCredentialDto.token)
  }
  
}
