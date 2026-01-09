import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  firebaseUid: string;

  @Column({ nullable: true })
  name?: string;

  @Column({ nullable: true })
  fcmToken?: string;
}
