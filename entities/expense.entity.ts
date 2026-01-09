import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { GroupEntity } from './group.entity';

@Entity('expenses')
export class ExpenseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  payerUid: string;

  @ManyToOne(() => UserEntity)
  payer: UserEntity;

  @Column({ type: 'enum', enum: ['EQUAL', 'EXACT', 'PERCENT'] })
  splitType: 'EQUAL' | 'EXACT' | 'PERCENT';

  @Column('jsonb')
  splits: Record<string, number>; 

  @Column({ nullable: true })
  groupId?: string;

  @ManyToOne(() => GroupEntity, { nullable: true })
  group?: GroupEntity;

  @CreateDateColumn()
  createdAt: Date;

  @Column()
  creatorUid: string;
}
