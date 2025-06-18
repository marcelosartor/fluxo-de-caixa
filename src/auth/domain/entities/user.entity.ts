import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, VirtualColumn } from 'typeorm'
import { StatusUser } from '../enums/statusUser.enum'
import { YesOrNo } from 'src/core/communs/domain/enums/yes-or-no.enum'
import { DateTime } from 'luxon'

@Entity('APP_USER')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nome: string

  @Column()
  senha: string
  
  @Column()
  email: string

  @Column({ name: 'created_at', type: 'datetime' })
  criadoEm: Date

  @BeforeInsert()
  beforeInsert() {
    const _date = DateTime.now().toUTC().toJSDate()
    this.criadoEm = _date
  }
}
