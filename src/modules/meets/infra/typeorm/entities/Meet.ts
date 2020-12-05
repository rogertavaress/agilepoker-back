import { Exclude } from 'class-transformer';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';

@Entity('meets')
class Meet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  idMeet: string;

  @Column({ unique: true })
  name: string;

  @Column()
  email: string;

  @Column()
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Exclude()
  isCreated: boolean;
}

export default Meet;
