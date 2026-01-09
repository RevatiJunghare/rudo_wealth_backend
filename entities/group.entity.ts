import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('groups')
export class GroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  creatorUid: string;

  @ManyToOne(() => UserEntity)
  creator: UserEntity;

@ManyToMany(() => UserEntity, (user: UserEntity) => user.name)
@JoinTable({ name: 'group_members' })
members: UserEntity[];
}
