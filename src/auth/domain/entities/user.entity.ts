import { BeforeInsert, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, VirtualColumn } from 'typeorm'
import { DateTime } from 'luxon'

@Entity('APP_USER')
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  name: string

  @Column()
  password: string
  
  @Column()
  email: string

  @Column({ name: 'created_at', type: 'datetime' })
  createAt: Date

  @BeforeInsert()
  beforeInsert() {
    const _date = DateTime.now().toUTC().toJSDate()
    this.createAt = _date
  }
}
